import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  email: string;
  emailPass: string;
  private transporter: any;
  private configService: ConfigService;

  constructor(configService: ConfigService) {
    this.configService = configService;
    const email = this.configService.get<string>('EMAIL');
    const emailPass = this.configService.get<string>('EMAIL_PASS');
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: emailPass,
      },
    });
  }

  async sendMail(
    first_name: string,
    last_name: string,
    email: string,
    message: string,
  ) {
    const mailOptions = {
      from: 'teodorbriceanu@gmail.com',
      to: 'teodorbriceanu@gmail.com',
      subject: 'this is a mail from your website',
      html: `
      <p>Sender: ${first_name} ${last_name}</p>
       <p>${email}</p>
       <p>Message:</p>
      <p>${message}</p>
      `,
    };
    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Failed to send email', error);
    }
  }
}
