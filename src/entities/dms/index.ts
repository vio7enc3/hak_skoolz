import axios from 'axios';

const getBaseURL = (): string => {
  switch (window.location.hostname) {
    case 'didox.uz':
      return 'https://api.didox.uz/v1/dsvs/';
    case 'localhost.didox.uz':
      return 'https://localhost.didox.uz/v1/dsvs/';
    default:
      return 'https://devapi.goodsign.biz/v1/dsvs/';
  }
};

const instance = axios.create({
  baseURL: getBaseURL(),
});

export const getTimestamp = (signatureHex: string) =>
  instance.post(`gettimestamp`, { signatureHex });
