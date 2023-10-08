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
		let current = new Date();
		let now = new Date(current.getTime() + 8 * 60 * 60 * 1000);
		console.log("now: ", now);

		if (now >= reminder.time){
			console.log("Reminder time reached." + reminder.time);
			let ping = 0;
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
		
			let queryString = `?userIds=${participantsdiscord.participants.map(participant => participant.discordID).join(',')}`;
			
			let eventTitle = await this.db.event.findUnique({
				where: {
					id: reminder.eventID,
				},
				select: {
					title: true,
				},
			});
			queryString += "&message=Remember to join " + eventTitle.title + "&linkUrl=http://localhost:5173/gathering/" + reminder.eventID;

			if (ping == 0){
				console.log("pinging")
				let response = await fetch("http://localhost:58420/sendpublic" + queryString,{
					method: "GET",
				});
				ping = 1;
			}

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