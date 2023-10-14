/* eslint-disable */
import dayjs from 'dayjs';
import _ from 'lodash';

import parseEimzoKey from '@/app/helpers/parseEimzoKey';
import { CAPIWS } from '@/app/vendors/e-imzo';
import { getTimestamp } from '@/entities/dms';
import { Cert } from '../model/types';

interface IGetCertsRes {
  certificates: Cert[];
}

const timestamper = (signatureHex: string, callback: (args: any) => void) => {
  getTimestamp(signatureHex)
    .then(({ data }) => {
      if (data.success) {
        callback(data.timeStampTokenB64);
      } else {
        // showAlert('error', data.reason);
      }
    })
    .catch((err) => {
      // showAlert('error', err.response && err.response.statusText);
    });
};

export const startApi = () => {
  CAPIWS.apikey([
    'localhost',
    '96D0C1491615C82B9A54D9989779DF825B690748224C2B04F500F370D51827CE2644D8D4A82C18184D73AB8530BB8ED537269603F61DB0D03D2104ABF789970B',
    '127.0.0.1',
    'A7BCFA5D490B351BE0754130DF03A068F855DB4333D43921125B9CF2670EF6A40370C646B90401955E1F7BC9CDBF59CE0B2C5467D820BE189C845D0B79CFC96F',
  ]);
};

export const getAllCertificatesCertkey = () =>
  new Promise<IGetCertsRes>((resolve, reject) => {
    CAPIWS.callFunction(
      {
        plugin: 'certkey',
        name: 'list_all_certificates',
      },
      (_event: any, data: any) => {
        resolve(data);
      },
      (error: any) => {
        reject(error);
      }
    );
  });

export const getAllCertificatesPfx = () =>
  new Promise<IGetCertsRes>((resolve, reject) => {
    CAPIWS.callFunction(
      {
        plugin: 'pfx',
        name: 'list_all_certificates',
      },
      (_event: any, data: any) => {
        resolve(data);
      },
      (error: any) => {
        reject(error);
      }
    );
  });

const preLoadKey = (item: any) =>
  new Promise((resolve, reject) => {
    CAPIWS.callFunction(
      {
        plugin: 'certkey',
        name: 'load_key',
        arguments: [item.disk, item.path, item.name, item.serialNumber],
      },
      (_event: any, data: any) => {
        if (data.success) {
          resolve(data.keyId);
        } else {
          reject(data.reason);
        }
      }
    );
  });

const postLoadKey = (id: any, string: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    CAPIWS.callFunction(
      {
        plugin: 'pkcs7',
        name: 'create_pkcs7',
        arguments: [btoa(unescape(encodeURIComponent(string))), id, 'no'],
      },
      (_event: any, data: any) => {
        if (data.success) {
          const pkcs7 = data.pkcs7_64;
          if (timestamper) {
            const sn = data.signer_serial_number;
            timestamper(data.signature_hex, (tst) => {
              CAPIWS.callFunction(
                {
                  plugin: 'pkcs7',
                  name: 'attach_timestamp_token_pkcs7',
                  arguments: [pkcs7, sn, tst],
                },
                (_event2: any, data2: any) => {
                  if (data2.success) {
                    const pkcs7tst = data2.pkcs7_64;
                    resolve(pkcs7tst);
                  } else {
                    reject(data2.reason);
                  }
                },
                (e: any) => {
                  reject(e);
                }
              );
            });
          } else {
            resolve(pkcs7);
          }
        } else {
          reject(data.reason);
        }
      }
    );
  });
};

const postLoadKeyAttach = (id: string, string: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    CAPIWS.callFunction(
      {
        plugin: 'pkcs7',
        name: 'append_pkcs7_attached',
        arguments: [string, id],
      },
      (_event: any, data: any) => {
        if (data.success) {
          const pkcs7 = data.pkcs7_64;
          if (timestamper) {
            const sn = data.signer_serial_number;
            timestamper(data.signature_hex, (tst) => {
              CAPIWS.callFunction(
                {
                  plugin: 'pkcs7',
                  name: 'attach_timestamp_token_pkcs7',
                  arguments: [pkcs7, sn, tst],
                },
                (_event2: any, data2: any) => {
                  if (data2.success) {
                    const pkcs7tst = data2.pkcs7_64;
                    resolve(pkcs7tst);
                  } else {
                    reject(data2.reason);
                  }
                },
                (e: any) => {
                  reject(e);
                }
              );
            });
          } else {
            resolve(pkcs7);
          }
        } else {
          reject(data.reason);
        }
      },
      (e: any) => {
        reject(e);
      }
    );
  });
};

const loadPfxKey = (item: any, string: string, type?: string): Promise<string> =>
  new Promise((resolve, reject) => {
    CAPIWS.callFunction(
      {
        plugin: 'pfx',
        name: 'load_key',
        arguments: [item.disk, item.path, item.name, item.alias],
      },
      (_event: any, data: any) => {
        if (data.success) {
          const id = data.keyId;
          window.sessionStorage.setItem(item.serialNumber, id);
          const func = type === 'attach' ? postLoadKeyAttach : postLoadKey;
          func(id, string).then(
            (encryptedString) => {
              resolve(encryptedString);
            },
            (e) => {
              reject(e);
            }
          );
        } else {
          reject(data.reason);
        }
      },
      (e: any) => {
        reject(e);
      }
    );
  });

export const getSignature = (item: any, string: string): Promise<string> =>
  new Promise((resolve, reject) => {
    if (item.type === 'certkey') {
      preLoadKey(item).then(
        (id) => {
          postLoadKey(id, string).then(
            (encryptedString: string) => {
              resolve(encryptedString);
            },
            (error) => {
              reject(error);
            }
          );
        },
        (error) => {
          reject(error);
        }
      );
    } else if (item.type === 'pfx') {
      const id = window.sessionStorage.getItem(item.serialNumber);
      if (id) {
        postLoadKey(id, string).then(
          (encryptedString) => {
            resolve(encryptedString);
          },
          () => {
            loadPfxKey(item, string)
              .then((encryptedString) => {
                resolve(encryptedString);
              })
              .catch((e) => {
                reject(e);
              });
          }
        );
      } else {
        loadPfxKey(item, string)
          .then((encryptedString) => {
            resolve(encryptedString);
          })
          .catch((e) => {
            reject(e);
          });
      }
    }
  });

export const getAcceptSignature = (item: any, data: any): Promise<string> =>
  new Promise((resolve, reject) => {
    if (item.type === 'certkey') {
      preLoadKey(item).then(
        (id: any) => {
          postLoadKeyAttach(id, data).then(
            (encryptedString) => {
              resolve(encryptedString);
            },
            (error) => {
              reject(error);
            }
          );
        },
        (error) => {
          reject(error);
        }
      );
    } else if (item.type === 'pfx') {
      const id = window.sessionStorage.getItem(item.serialNumber);
      if (id) {
        postLoadKeyAttach(id, data).then(
          (encryptedString) => {
            resolve(encryptedString);
          },
          () => {
            loadPfxKey(item, data, 'attach');
          }
        );
      } else {
        loadPfxKey(item, data, 'attach').then((encryptedString) => {
          resolve(encryptedString);
        });
      }
    }
  });

const parseValidDate = (date: string) => new Date(date.split(' ')[0].split('.').join(','));

export const sign = async (string: string, uidOrCert: string | Cert): Promise<string> =>
  new Promise(async (resolve, reject) => {
    let cert: Cert;
    if (typeof uidOrCert === 'string') {
      cert = await getCertificate(uidOrCert).then((res) => res);
    } else {
      cert = uidOrCert;
    }
    try {
    } catch {
      // showAlert('error', i18n.CheckEimzo);
      return reject();
    }
    try {
      const signature = await getSignature(cert, string);
      resolve(signature);
    } catch (err) {
      // showAlert('error', i18n.PasswordIncorrect);
      reject();
    }
  });

export const attach = (string: string, uid: string, customCert?: any): Promise<string> =>
  new Promise(async (resolve, reject) => {
    let cert = _.cloneDeep(customCert);
    try {
      cert = await getCertificate(uid).then((res) => res);
    } catch {
      // showAlert('error', i18n.CheckEimzo);
      return reject();
    }
    try {
      const signature = await getAcceptSignature(cert, string);
      resolve(signature);
    } catch {
      // showAlert('error', i18n.PasswordIncorrect);
      reject();
    }
  });

export const getCertificate = (uid: string) =>
  new Promise<Cert>(async (resolve, reject) => {
    // const { uid, serialNumber, accountTin } = store.getState().auth;
    let allCerts: any;
    try {
      allCerts = await getAllCertificates(uid);
      // if (!allCerts || !allCerts?.length) {
      //   allCerts = await getAllCertificates(accountTin);
      // }
    } catch {
      return reject();
    }
    // if (serialNumber) {
    //   resolve(
    //     allCerts.find(
    //       (cert: ICert) =>
    //         (cert.inn === uid || cert.parsedAlias?.['1.2.860.3.16.1.2'] === uid) &&
    //         cert.serialNumber === serialNumber
    //     )
    //   );
    // }
    // else
    const filteredCerts = allCerts.filter(
      (cert: any) => cert.inn === uid || cert.parsedAlias?.['1.2.860.3.16.1.2'] === uid
    );
    switch (filteredCerts.length) {
      case 0:
        // showAlert('error', i18n.CertNotFound);
        reject();
        break;
      case 1:
        resolve(filteredCerts[0]);
        break;
      default:
        resolve(
          filteredCerts.sort((a: any, b: any) =>
            parseValidDate(a.parsedAlias.validto) > parseValidDate(b.parsedAlias.validto) ? -1 : 1
          )[0]
        );
    }
  });

export const getAllCertificates = (uid?: string): Promise<Cert[]> =>
  new Promise(async (resolve, reject) => {
    try {
      const { certificates: pfxCerts } = await getAllCertificatesPfx();
      const { certificates: certkeyCerts } = await getAllCertificatesCertkey();
      const certs: Cert[] = [
        ...parseEimzoKey(pfxCerts, 'pfx'),
        ...parseEimzoKey(certkeyCerts, 'certkey'),
      ]
        .map((i) => ({
          ...i,
          overdue:
            new Date() >
            dayjs(i?.parsedAlias?.validto || new Date(), 'YYYY.MM.DD')
              .add(1, 'day')
              .toDate(),
        }))
        .sort((a, b) => a.overdue - b.overdue);
      // store.dispatch(setEimzoError(false));
      if (uid) {
        const foundCerts = certs.filter(
          (cert) => cert.inn === uid || cert.parsedAlias?.['1.2.860.3.16.1.2'] === uid
        );
        resolve(foundCerts);
      } else {
        resolve(certs);
      }
    } catch (error) {
      // store.dispatch(setEimzoError(true));
      reject(error);
    }
  });

export default {
  startApi,
  getAllCertificates,
  sign,
  attach,
};
