type Props = {
  receiver_email: string,
  message: string,
};

export class TestEvent {
  message: string;
  receiver_email: string;
  constructor({ receiver_email, message }: Props) {
    this.receiver_email = receiver_email;
    this.message = message;
  }
}
