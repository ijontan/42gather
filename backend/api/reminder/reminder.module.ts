import { Module } from "@nestjs/common";
import { ReminderService } from "./reminder.service";
import { ReminderController } from "./reminder.controller";
import { ScheduleModule } from "@nestjs/schedule";
import { DatabaseModule } from "../database/database.module";

@Module({
	imports: [ScheduleModule.forRoot(), DatabaseModule],
	controllers: [ReminderController],
	providers: [ReminderService],
	exports: [ReminderService],
})
export class ReminderModule {

}