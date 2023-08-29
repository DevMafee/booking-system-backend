import {Injectable} from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  /*
  * Application send to subsuper admin Send email
  */
  applicationSendToSubSuperAdminMail(
    application_id: string,
    receiver_email: string,
    receiver_name: string,
    company_name: string,
    company_address: string,
    mobile: string
  ) {
    const applicationUrl = process.env.FRONTEND_URL + '/admin/application/'+application_id+'/view'

    this.mailerService.sendMail({
      to: receiver_email,
      // from: '', // by default it comes from .env MAIL_FROM_NAME file
      subject: 'New applciation find for reviews from '+ company_name ,
      template: 'application-send-to-sub-super-admin-mail',
      context: {
        application_id,
        receiver_name,
        company_name,
        company_address,
        mobile,
        applicationUrl,
      },
    }).catch((err) => {
      console.log(err)
    })

  }

  /*
  * Company registration to sub super admin Send email
  */
  companyRegistrationToSubSuperAdminMail(
    receiver_email: string,
    receiver_name: string,
    company_name: string,
    company_address: string,
    mobile: string,
    country: string,
    owner_name: string,
    email: string,
    username: string,
    standards_name: string,
    postal_code: string
    ) {
    const companyUrl = process.env.FRONTEND_URL+'/admin/companies';

    this.mailerService.sendMail({
      to: receiver_email,
      // from: '', // by default it comes from .env MAIL_FROM_NAME file
      subject: 'New query has been generated' ,
      template: 'company-registration-to-sub-super-admin-mail',
      context: {
        receiver_name,
        company_name,
        company_address,
        mobile,
        country,
        companyUrl,
        owner_name,
        email,
        username,
        standards_name,
        postal_code
      },
    }).catch((err) => {
      console.log(err)
    })
  }

  /*
  * Company registration to sub super admin Send email
  */
  companyRegistrationToCountryAdminForwardMail(
    receiver_email: string,
    receiver_name: string,
    company_name: string,
    company_address: string,
    mobile: string,
    country: string,
    owner_name: string,
    email: string,
    standards_name: string,
    postal_code: string
    ) {
    const companyUrl = process.env.FRONTEND_URL+'/admin/companies';

    this.mailerService.sendMail({
      to: receiver_email,
      // from: '', // by default it comes from .env MAIL_FROM_NAME file
      subject: 'Query has been forwarded' ,
      template: 'company-registration-to-country-admin-forward-mail',
      context: {
        receiver_name,
        company_name,
        company_address,
        mobile,
        country,
        companyUrl,
        owner_name,
        email,
        standards_name,
        postal_code
      },
    }).catch((err) => {
      console.log(err)
    })
  }

  /*
  * Company registration to country admin approve send email
  */
  companyRegistrationCountryAdminApproveEventMail(
    receiver_email: string,
    receiver_name: string,
    sender_name: string,
    sender_mobile: string,
    username: string,
    ) {
    const url = process.env.FRONTEND_URL+'/company/forgot-password';

    this.mailerService.sendMail({
      to: receiver_email,
      // from: '', // by default it comes from .env MAIL_FROM_NAME file
      subject: 'Query has been accepted by GSCS',
      template: 'company-registration-country-admin-approve-mail',
      context: {
        receiver_name,
        sender_name,
        sender_mobile,
        username,
        url
      },
    }).catch((err) => {
      console.log(err)
    })
  }

  /*
  * Company registration to country admin reject Send email
  */
  companyRegistrationCountryAdminRejectEventMail(
    receiver_email: string,
    receiver_name: string,
    sender_name: string,
    sender_mobile: string,
    ) {

    this.mailerService.sendMail({
      to: receiver_email,
      // from: '', // by default it comes from .env MAIL_FROM_NAME file
      subject: 'Query has been rejected by GSCS',
      template: 'company-registration-country-admin-reject-mail',
      context: {
        receiver_name,
        sender_name,
        sender_mobile
      },
    }).catch((err) => {
      console.log(err)
    })
  }

  /*
  * Company reset password Send email
  */
  companyResetPasswordMail(
    id: string,
    receiver_email: string,
    receiver_name: string,
    reset_code: number,
    ) {
    const actionUrl = process.env.FRONTEND_URL + '/company/forgot-password/'+id+'/reset';

    this.mailerService.sendMail({
      to: receiver_email,
      // from: '', // by default it comes from .env MAIL_FROM_NAME file
      subject: 'OTP to set password GSCS',
      template: 'company-reset-password-mail',
      context: {
        receiver_name,
        reset_code,
        actionUrl
      },
    }).catch((err) => {
      console.log(err)
    })
  }

  /*
  * admin reset password Send email
  */
  adminResetPasswordMail(
    id: string,
    receiver_email: string,
    receiver_name: string,
    reset_code: number,
    ) {
    const actionUrl = process.env.FRONTEND_URL + '/admin/forgot-password/'+id+'/reset';

    this.mailerService.sendMail({
      to: receiver_email,
      // from: '', // by default it comes from .env MAIL_FROM_NAME file
      subject: 'OTP to set password GSCS',
      template: 'admin-reset-password-mail',
      context: {
        receiver_name,
        reset_code,
        actionUrl
      },
    }).catch((err) => {
      console.log(err)
    })
  }

  /*
  * admin reset password Send email
  */
  adminExpireMessageSendToClientMail(
    receiver_email: string,
    company_name: string,
    valid_till: string|boolean,
    receiver_name: string,
    standard: string,
    is_gots: boolean,
    ) {

    this.mailerService.sendMail({
      to: receiver_email,
      cc: ['coordinator_bd@gscsintl.com', 'kamal@gscsintl.com', 'credit@gscsbd.com'],
      replyTo:'coordinator_bd@gscsintl.com',
      // from: '', // by default it comes from .env MAIL_FROM_NAME file
      subject: standard+' Renewal Audit at '+company_name,
      template: 'admin-expire-message-mail',
      context: {
        receiver_name,
        company_name,
        valid_till,
        standard,
        is_gots
      },
    }).catch((err) => {
      console.log(err)
    })
  }

  /*
  * Company registration welcome email
  */
  companyRegistrationWelcomeMail(
    receiver_email: string,
    receiver_name: string,
    ) {

    this.mailerService.sendMail({
      to: receiver_email,
      // from: '', // by default it comes from .env MAIL_FROM_NAME file
      subject: 'Successful Query Generation GSCS',
      template: 'company-registration-welcome-mail',
      context: {
        receiver_name,
        receiver_email,
      },
    }).catch((err) => {
      console.log(err)
    })
  }

  /*
  * Company email username chage notification  email
  */
  companyEmailUserNameChangeMail(
    receiver_email: string,
    email_update: boolean,
    username_update: boolean,
    new_email: string,
    new_username: string,
    ) {

    this.mailerService.sendMail({
      to: receiver_email,
      // from: '', // by default it comes from .env MAIL_FROM_NAME file
      subject: 'Login credential chage by GSCS',
      template: 'company-email-username-chage-mail',
      context: {
        receiver_email,
        email_update,
        username_update,
        new_email,
        new_username
      },
    }).catch((err) => {
      console.log(err)
    })
  }

  /*
  * Quotation send to company email
  */
  quotationSendToCompanyMail(
    receiver_email: string,
    attachFile: string,
  ) {

    this.mailerService.sendMail({
      to: receiver_email,
      // from: '', // by default it comes from .env MAIL_FROM_NAME file
      subject: 'Quotation & Client Agreement GSCS',
      template: 'quotation-send-to-company-mail',
      context: {
        attachFile,
      },
    }).catch((err) => {
      console.log(err)
    })
  }

  /*
  * Quotation send to company email
  */
  testMail(
    receiver_email: string,
    message: string,
  ) {

    this.mailerService.sendMail({
      to: receiver_email,
      // from: '', // by default it comes from .env MAIL_FROM_NAME file
      subject: 'TEST mail GSCS',
      template: 'test',
      context: {
        message,
        receiver_email
      },
    }).catch((err) => {
      console.log(err)
    })
  }
}
