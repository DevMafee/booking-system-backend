import { EmailService } from './services/email.service';
import { Module } from '@nestjs/common';
import { ApplicationSendToSubSuperAdminListener } from './listener/application-send-to-sub-super-admin.listener';
import { CompanyRegistrationToSubSuperAdminListener } from './listener/company-auth/company-registration-to-sub-super-admin.listener';
import { CompanyRegistrationCountryAdminApproveListener } from "./listener/company-auth/company-registration-country-admin-approve.listener";
import { CompanyRegistrationCountryAdminRejectListener } from "./listener/company-auth/company-registration-country-admin-reject.listener";
import { CompanyRegistrationWelcomeListener } from "./listener/company-auth/company-registration-welcome.listener";
import { CompanyResetPasswordListener } from "./listener/company-auth/company-reset-password.listener";
import { QuotationSendToCompanyListener } from "./listener/quotation-send-to-company.listener";
import { CompanyRegistrationToCountryAdminForwardListener } from "./listener/company-auth/company-registration-to-country-admin-forward.listener";
import { DataLogService } from "./services/data-log.service";
import { DataLogEventListener } from "./listener/data-log.listener";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataLogEntity } from "../common/entities/shared/_log/data-log.entity";
import { TestListener } from './listener/test.listener';
import { AdminResetPasswordListener } from "./listener/admin/admin-reset-password.listener";
import { CompanyEmailUserNameChangeListener } from "./listener/company-auth/company-email-username-change.listener";
import { AdminExpireEmailToClientListener } from './listener/admin/admin-send-expire-email-to-client.listener';

@Module({
  imports: [TypeOrmModule.forFeature([
    DataLogEntity,
  ])],
  providers: [
    //listeners
    ApplicationSendToSubSuperAdminListener,
    CompanyRegistrationToSubSuperAdminListener,
    CompanyRegistrationCountryAdminApproveListener,
    CompanyRegistrationCountryAdminRejectListener,
    CompanyResetPasswordListener,
    CompanyRegistrationWelcomeListener,
    QuotationSendToCompanyListener,
    CompanyRegistrationToCountryAdminForwardListener,
    AdminResetPasswordListener,
    DataLogEventListener,
    TestListener,
    CompanyEmailUserNameChangeListener,
    AdminExpireEmailToClientListener,

    //service
    EmailService,
    DataLogService,
  ],
})
export class ObserverModule {}
