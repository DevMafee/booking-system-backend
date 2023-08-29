export enum EAuditDetailsLogType {
  accessories_details= 'application_audit_accessories_details',
  attendance_details= 'application_audit_attendance_details',
  avr_details= 'application_audit_avr_details',
  bs_details= 'application_audit_bs_details',
  checklist_details= 'application_audit_checklist_details',
  chemical_details= 'application_audit_chemical_details',
  client_info_details= 'application_audit_client_info_details',
  client_info_question_answer= 'application_audit_client_info_question_answer',
  corrective_action_details= 'application_audit_corrective_action_details',
  environment_details= 'application_audit_environment_details',
  facility_details= 'application_audit_facility_details',
  living_wage_calculator_details= 'application_audit_living_wage_calculator_details',
  nonc_details= 'application_audit_nonc_details',
  packaging_details= 'application_audit_packaging_details',
  product_list_details= 'application_audit_product_list_details',
  raw_material_details= 'application_audit_raw_material_details',
  result_details= 'application_audit_result_details',
  risk_analysis_details= 'application_audit_risk_analysis_details',
  ronc_details= 'application_audit_ronc_details',
  sampling_details= 'application_audit_sampling_details',
  traceability_detail_process= 'application_audit_traceability_detail_process',
  traceability_details= 'application_audit_traceability_details',
}

export class AuditDetailsLogEvent {
  details_type: EAuditDetailsLogType;
  details_id: string;
  log_company_id: string;
  log_admin_id: string;
  logged_admin_type?: string;
  log_user_type: 'EDetailsLogUserType';
  detailData?: Record<string, any>;
  constructor(data: Partial<AuditDetailsLogEvent>) {
    Object.assign(this, data);
  }
}