type Props = {
  application_id: string;
  receiver_email: string;
  receiver_name: string;
  company_name: string;
  company_address: string;
  mobile: string;
};

export class ApplicationSendToSubSuperAdminEvent {
  application_id: string;
  receiver_email: string;
  receiver_name: string;
  company_name: string;
  company_address: string;
  mobile: string;
  
  constructor({ application_id, receiver_email, receiver_name, company_name, company_address, mobile }: Props) {
    this.application_id = application_id;
    this.receiver_email = receiver_email;
    this.receiver_name = receiver_name;
    this.company_name = company_name;
    this.company_address = company_address;
    this.mobile = mobile;
  }
}
