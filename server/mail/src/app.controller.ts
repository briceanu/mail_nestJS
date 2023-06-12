import { Controller, Post, Body, Inject } from '@nestjs/common';
import { AppService } from './app.service';

interface Data {
  first_name: string;
  last_name: string;
  email: string;
  message: string;
}

@Controller()
export class EmailController {
  constructor(@Inject(AppService) private appService: AppService) {}

  @Post('/contact')
  async sendEmail(
    @Body()
    body: Data,
  ) {
    const { first_name, last_name, email, message } = body;
    await this.appService.sendMail(first_name, last_name, email, message);
  }
}
