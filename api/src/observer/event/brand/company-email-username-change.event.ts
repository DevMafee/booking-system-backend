type Props = {
  receiver_email: string;
  email_update: boolean;
  username_update: boolean;
  new_email: string;
  new_username: string;
};

export class  CompanyEmailUserNameChangeEvent {
  receiver_email: string;
  email_update: boolean;
  username_update: boolean;
  new_email: string;
  new_username: string;

  constructor({ receiver_email, email_update, username_update, new_email, new_username }: Props) {
    this.receiver_email = receiver_email;
    this.email_update = email_update;
    this.username_update = username_update;
    this.new_email = new_email;
    this.new_username = new_username;
  }
}
