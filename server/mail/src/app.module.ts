import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailController } from './app.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './src/.env',
    }),
  ],
  providers: [AppService],
  controllers: [EmailController],
})
export class EmailModule {}
