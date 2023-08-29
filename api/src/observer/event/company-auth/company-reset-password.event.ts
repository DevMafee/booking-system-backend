
type Props = {
  id: string;
  receiver_email: string;
  receiver_name: string;
  reset_code: number;
};

export class  CompanyResetPasswordEvent {
  id: string;
  receiver_email: string;
  receiver_name: string;
  reset_code: number;

  constructor({ id, receiver_email, receiver_name, reset_code }: Props) {
    this.id = id;
    this.receiver_email = receiver_email;
    this.receiver_name = receiver_name;
    this.reset_code = reset_code;
  }
}
