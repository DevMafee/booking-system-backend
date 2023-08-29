type Props = {
  receiver_email: string;
  receiver_name: string;
};

export class  CompanyRegistrationWelcomeEvent {
  receiver_email: string;
  receiver_name: string;

  constructor({ receiver_email, receiver_name }: Props) {
    this.receiver_email = receiver_email;
    this.receiver_name = receiver_name;
  }
}
