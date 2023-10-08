import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from 'src/user/user.service';
import { ReminderModule } from 'src/reminder/reminder.module';

@Module({
  controllers: [EventsController],
  providers: [EventsService, UserService],
  imports: [DatabaseModule, ReminderModule],
})
export class EventsModule {}
