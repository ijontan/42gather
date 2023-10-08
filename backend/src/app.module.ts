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

@Module({
  imports: [AuthModule, UserModule, DatabaseModule, EventsModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, ReminderService],
})
export class AppModule {}
