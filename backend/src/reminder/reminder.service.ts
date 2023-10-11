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
			console.log("participantsdiscord: ", participantsdiscord.participants);

			let discordIDs = [];
			for (let participant of participantsdiscord.participants){
				discordIDs.push(participant.discordID);
			}
			
			let eventTitle = await this.db.event.findUnique({
				where: {
						id: reminder.eventID,
					},
					select: {
							title: true,
						},
				});

				let messge = "Remember to join " + eventTitle.title + "&linkUrl=http://localhost:5173/gathering/" + reminder.eventID;
				
				if (ping == 0){
					this.sentReminder(discordIDs, messge);
					ping = 1;
				}	
								
				let index = this.reminderArray.indexOf(reminder);
				await this.reminderArray.splice(index, 1);
			
			}
		}
	}
					
	async sentReminder(discordID: string[], message: string){
		let queryString = `userIds=${discordID.map(id => id).join(',')}`;
		queryString += `&message=${message}`;
		console.log("queryString: ", queryString);
		let response = await fetch("http://localhost:58420/sendpublic?" + queryString,{
			method: "GET",
		});
		if(response.status != 200){
			console.log("Failed to send message");
			console.log("Status:", response.status);
			throw new Error("Failed to send message");
		}

	}
}