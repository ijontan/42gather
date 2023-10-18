import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { DatabaseModule } from '../database/database.module';
import { UserService } from '../user/user.service';
import { ReminderModule } from '../reminder/reminder.module';

@Module({
  controllers: [EventsController],
  providers: [EventsService, UserService],
  imports: [DatabaseModule, ReminderModule],
})
export class EventsModule {}
