type Props = {
  log_id: string,
  sub_log_id?: string,
  action_type: string,
  action_for: string,
  action_user_type: string,
  created_by?: string,
  company_user_created_by?: string,
  data?: {},
};

export class DataLogEvent {
  log_id: string;
  sub_log_id: string;
  action_type: string;
  action_for: string;
  action_user_type: string;
  created_by: string;
  company_user_created_by: string;
  data: {};
  constructor({ log_id, sub_log_id, action_type, action_for, action_user_type, created_by, data, company_user_created_by }: Props) {
    this.log_id = log_id;
    this.sub_log_id = sub_log_id;
    this.action_type = action_type;
    this.action_for = action_for;
    this.action_user_type = action_user_type;
    this.created_by = created_by;
    this.company_user_created_by = company_user_created_by;
    this.data = data;
  }
}
