export interface Cert {
  inn: string;
  serialNumber: string;
  parsedAlias: {
    cn: string; // ФИО владельца ЭЦП
    o: string; // название организации
    validto: string;
    validfrom: string;
    ['1.2.860.3.16.1.2']?: string;
    ['1.2.860.3.16.1.1']: string;
    businesscategory: string;
    c: string; // язык
    l: string; // локация: район
    name: string; // имя владельца ЭЦП 
    ou: string; // непонятное значение
    serialnumber: string;
    st: string; // локация: город
    surname: string; // фамилия
    t: string; // статус владельца
    uid: '451299778'; // ИНН владельца организации
  };
  overdue?: boolean;
}
