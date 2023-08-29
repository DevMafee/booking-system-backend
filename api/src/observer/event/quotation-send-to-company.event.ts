type Props = {
  receiver_email: string,
  attachFile: string,
};

export class QuotationSendToCompanyEvent {
  receiver_email: string;
  attachFile: string;
  constructor({ receiver_email, attachFile }: Props) {
    this.receiver_email = receiver_email;
    this.attachFile = attachFile;
  }
}
