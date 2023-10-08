import { Injectable } from "@nestjs/common";
import { EventReminderDTO } from "../dto/event.dto";
import { Cron,CronExpression } from "@nestjs/schedule";
import { DatabaseService } from "src/database/database.service";


@Injectable()
export class ReminderService{
	constructor(private db: DatabaseService) { }
	private reminderArray: EventReminderDTO[] = [];

  async getReminderArray(): Promise<EventReminderDTO[]> {
    console.log('getReminderArray');
    console.log(this.reminderArray.length)
    for (let reminder of this.reminderArray) {
      console.log(reminder);
    }
    return this.reminderArray;
  }

  async addReminder(reminder: EventReminderDTO) {
    await this.reminderArray.push(reminder);
  }
  
  @Cron(CronExpression.EVERY_MINUTE)
  async handleReminder(){
	console.log("handleReminder");
	for (let reminder of this.reminderArray){
		let now = new Date();

		if (now >= reminder.time){
			console.log("Reminder time reached");
			const participantsdiscord = await this.db.event.findUnique({
				where: {
					id: reminder.eventID,
				},
				select: {
					participants: {
						select: {
							discordID: true,
						},
					},
				},
			});
			console.log("participantsdiscord: ", participantsdiscord);
		
			let queryString = `?usersIds=${participantsdiscord.participants.map(participant => participant.discordID).join(',')}`;
			console.log(queryString);
			
			let eventTitle = await this.db.event.findUnique({
				where: {
					id: reminder.eventID,
				},
				select: {
					title: true,
				},
			});
			queryString += "&message=Remember to join " + eventTitle.title + "&linkUrl=";

			console.log("removing")
			let index = this.reminderArray.indexOf(reminder);
			console.log("before remove")
			console.log(this.reminderArray.length)
			await this.reminderArray.splice(index, 1);
			console.log("after remove")
			console.log(this.reminderArray.length)
		}
  	}
}

}