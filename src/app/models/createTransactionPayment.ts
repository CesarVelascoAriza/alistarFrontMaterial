import { atributes } from "./atributes";

export class createTransactionPayment {

  EntityCode: string = '';
  SessionToken: string = '';
  LifetimeSecs: number = 1200;
  SrvCode: string = '1001';
  TransValue: number = 0;
  TransVatValue: number = 0;
  SrvCurrency: string = 'COP';
  URLRedirect: string = '';
  ReferenceArray: Array<string> = [];
  PaymentSystem: string = '';
  Invoice: string = '';
  PolicyCode: string = '';
  PaymentInfoArray: Array<atributes> = [];

}