import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import{ UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { EventsModule } from './events/events.module';
import { ReminderModule } from './reminder/reminder.module';
import { ReminderService } from './reminder/reminder.service';
import { EventsService } from './events/events.service';

@Module({
  imports: [AuthModule, UserModule, DatabaseModule, EventsModule, ReminderModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, ReminderService,EventsService],
  exports : [AppService, ReminderService],
})
export class AppModule {}
