type Props = {
  receiver_email: string;
  receiver_name: string;
  company_name: string;
  company_address: string;
  mobile: string;
  country: string;
  owner_name: string;
  email: string;
  username: string;
  standards_name: string;
  postal_code: string;
};

export class  CompanyRegistrationToSubSuperAdminEvent {
  receiver_email: string;
  receiver_name: string;
  company_name: string;
  company_address: string;
  mobile: string;
  country: string;
  owner_name: string;
  email: string;
  username: string;
  standards_name: string;
  postal_code: string;

  constructor({ receiver_email, receiver_name, company_name, company_address, mobile, country, owner_name, email, username, standards_name, postal_code }: Props) {
    this.receiver_email = receiver_email;
    this.receiver_name = receiver_name;
    this.company_name = company_name;
    this.company_address = company_address;
    this.mobile = mobile;
    this.country = country;
    this.owner_name = owner_name;
    this.email = email;
    this.username = username;
    this.standards_name = standards_name;
    this.postal_code = postal_code;
  }
}
