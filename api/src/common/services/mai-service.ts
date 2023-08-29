import { EmailSendingDto } from './../dto/mail-sending.dto';
import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Injectable()
export class MailSendingService {
  async sendEmailToUser(details:EmailSendingDto) {
    const transport = createTransport({
      host: 'mail.simecsystem.com',
      port: 465,
      secure: true,
      // logger: true,
      // debug: true,
      // ignoreTLS: true,
      auth: {
        user: 'sumon@simecsystem.com',
        pass: '01858721723tumpa',
      },
    });

    const mailOptions = {
      from: 'sumon@simecsystem.com',
      to: details.to_email,
      subject: details.subject,
      text: details.info,
    };

    transport.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
  }
}