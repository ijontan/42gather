import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [EventsController],
  providers: [EventsService, UserService],
  imports: [DatabaseModule],
})
export class EventsModule {}
