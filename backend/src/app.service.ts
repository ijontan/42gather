import { Injectable } from '@nestjs/common';
import { EventReminderDTO } from './dto/event.dto';

@Injectable()
export class AppService {
  

  getHello(): string {
    return 'Hello World!';
  }
}
