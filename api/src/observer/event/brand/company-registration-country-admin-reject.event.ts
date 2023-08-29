type Props = {
  receiver_email: string;
  receiver_name: string;
  sender_name: string;
  sender_mobile: string;
};

export class  CompanyRegistrationCountryAdminRejectEvent {
  receiver_email: string;
  receiver_name: string;
  sender_name: string;
  sender_mobile: string;

  constructor({ receiver_email, receiver_name, sender_name, sender_mobile }: Props) {
    this.receiver_email = receiver_email;
    this.receiver_name = receiver_name;
    this.sender_name = sender_name;
    this.sender_mobile = sender_mobile;
  }
}
