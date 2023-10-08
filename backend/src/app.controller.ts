import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventReminderDTO } from './dto/event.dto';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
