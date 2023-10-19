import { Controller, Get } from "@nestjs/common";
import { ReminderService } from "./reminder.service";
import { EventReminderDTO } from "../dto/event.dto";

@Controller("remind")
export class ReminderController {
	constructor(private reminderService: ReminderService) { }

	@Get()
	async getReminder(): Promise<EventReminderDTO[]> {
		return await this.reminderService.getReminderArray();
	}
}