import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ReminderService } from 'src/reminder/reminder.service';
import { UserService } from 'src/user/user.service';
import { Event, EventParticipants, User } from '@prisma/client';
import { eventDataDTO, eventCreationDTO, EventReminderDTO } from 'src/dto/event.dto';
import { UserDataDTO } from 'src/dto/user.dto';

@Injectable()
export class EventsService {
	constructor(private db: DatabaseService, private userService: UserService, private readonly app:ReminderService) {}

	async createEvent(eventCreationDTO: eventCreationDTO, token: string): Promise<number> {
		let tokenCode = token.split(' ')[1];
		let userID = await this.userService.getIDFromToken(tokenCode);
		console.log(userID);
		const { title, description, venue, datetime, color, limit, tags,reminders } = eventCreationDTO;
		let localDate = new Date(datetime);
		let localTime = localDate.getTime() + 8 * 60 * 60 * 1000;
		let formattedDate = new Date(localTime);
		let event = await this.db.event.create({
			data: {
				title: title,
				description: description,
				venue: venue,
				datetime: formattedDate,
				color: color,
				limit: limit,
				tags: tags,
				reminders: reminders,
				creator: {
					connect: {id: userID},
				},
			},
		});
		const eventID = event.id;
		if (reminders){
			console.log("Start time: ", formattedDate);
			for (let reminder of reminders){
				switch (reminder){
					case 0:
						console.log("5min");
						let rt1 = formattedDate.getTime() - 5 * 60 * 1000;
						let rt1t = new Date(rt1);
						await this.app.addReminder(new EventReminderDTO(rt1t, eventID))
						break;
					case 1:
						console.log("15min");
						let rt2 = formattedDate.getTime() - 15 * 60 * 1000;
						let rt2t = new Date(rt2);
						await this.app.addReminder(new EventReminderDTO(rt2t, eventID))
						break;
					case 2:
						console.log("1hour");
						let rt3 = formattedDate.getTime() - 60 * 60 * 1000;
						let rt3t = new Date(rt3);
						await this.app.addReminder(new EventReminderDTO(rt3t, eventID))
						break;
					case 3:
						console.log("1day");
						let rt4 = formattedDate.getTime() - 24 * 60 * 60 * 1000;
						let rt4t = new Date(rt4);
						await this.app.addReminder(new EventReminderDTO(rt4t, eventID))
						break;
					case 4:
						console.log("1week");
						let rt5 = formattedDate.getTime() - 7 * 24 * 60 * 60 * 1000;
						let rt5t = new Date(rt5);
						await this.app.addReminder(new EventReminderDTO(rt5t, eventID))
						break;
				}
			}
		}
		this.joinEvent(eventID, token);
		if(eventCreationDTO.preJoinMemberID != null){
			for (let memberID of eventCreationDTO.preJoinMemberID){
				await this.db.event.update({
					where: {
						id: eventID,
					},
					data: {
						participants: {connect: {id: memberID}},
					},
				})
			}
		}
		return eventID;
	}

	async joinEvent(eventID: number, token: string): Promise<any> {
		let tokenCode = token.split(' ')[1];
		let userID = await this.userService.getIDFromToken(tokenCode);
		let event = await this.db.event.findUnique({
			where: {
				id: eventID,
			},
		});
		if (!event) {
			throw new Error('Event not found');
		}
		const existingParticipants: EventParticipants | null = await this.db.eventParticipants.findFirst({
			where: {
				eventID: eventID,
				userID: userID,
			},
		});
		if (existingParticipants) {
			console.log('Already joined');
			return false;
		}

		const eventParticipants = await this.db.eventParticipants.create({
			data: {
				event: {connect: {id: eventID}},
				participant: {connect: {id: userID}},
			},
		});

		await this.db.event.update({
			where: {
				id: eventID,
			},
			data: {
				participants: {connect: {id: userID}},
				},
		});
		return true;
	}

	async getMyEvents(token: string): Promise<any> {
		let tokenCode = token.split(' ')[1];
		let userID = await this.userService.getIDFromToken(tokenCode);
		console.log(userID);
		let events = await this.db.user.findUnique({
			where: {
				id: userID,
			},
			include:{
				joinedEvents: {
					include:{
						participants: true,
					}
				}
			}
		});
		if (!events){
			return [];
		}
		return events.joinedEvents;
	}
	

	async getSuggestedEvents(token: string): Promise<any> {
		let tokenCode = token.split(' ')[1];
		let userID = await this.userService.getIDFromToken(tokenCode);
		let participated = await this.db.eventParticipants.findMany({
			where: {
				userID: userID,
			},
		}).then((eventParticipants) => eventParticipants.map((eventParticipant) => eventParticipant.eventID));

		let notParticipated = await this.db.event.findMany({
			where: {
				id: {
					notIn: participated,
				},
			},
			include:{
				participants: true,
			}
		});
		return notParticipated;
	}

	async getTodayEvents(token: string): Promise<any> {
		const today = new Date().toISOString().split('T')[0];
		console.log(today);
		const events = await this.db.event.findMany({
			where: {
				datetime: {
					gte: new Date(today),
					lt: new Date(today + 'T23:59:59'),
				},
			},
			include:{
				participants: true,
			}
		});
		return events;
	}

	async getWeekEvents(token: string): Promise<any> {
		const current =new Date();
		const startofWeek = new Date(current)
		startofWeek.setDate(current.getDate() - current.getDay());

		const endofWeek = new Date(current)
		endofWeek.setDate(startofWeek.getDate() + 6);
		const events = await this.db.event.findMany({
			where: {
				datetime: {
					gte: startofWeek,
					lt: endofWeek,
				},
			},
			include:{
				participants: true,
			}
		});
		return events;
	}

	async getMonthEvents(token: string): Promise<any> {
		const current =new Date();
		const startofMonth = new Date(current.getFullYear(), current.getMonth(), 1);
		const endofMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0);
		const events = await this.db.event.findMany({
			where: {
				datetime: {
					gte: startofMonth,
					lt: endofMonth,
				},
			},
			include:{
				participants: true,
			}
		});
		return events;
	}


	async getEventByID(token: string, id: string): Promise<any> {
		
		//Get event data
		let eventID = parseInt(id);
		let event = await this.db.event.findUnique({
			where: {
				id: eventID,
			},
			include:{
				participants: true,
			}
		});
		if (!event) {
			throw new Error('Event not found');
		}

		//Check user joined or not
		let tokenCode = token.split(' ')[1];
		let userID = await this.userService.getIDFromToken(tokenCode);
		let joined = false;
		for (const participant of event.participants){
			if (participant.id == userID){
				joined = true;
			}
		}

		//Clean up participants, remove creator id
		let participants = []
		let creatorDTO;
		for (const participant of event.participants){
			if (participant.id != event.creatorID){
				participants.push(
					new UserDataDTO(
						participant.intraID,
						participant.name,
						participant.imageLink,
						participant.discordID,
					)
					);
			}
			if (participant.id == event.creatorID){
				creatorDTO = new UserDataDTO(
					participant.intraID,
					participant.name,
					participant.imageLink,
					participant.discordID,
				)
			}
		}

		return new eventDataDTO(
			event.id,
			event.title,
			event.description,
			event.venue,
			event.datetime.toISOString(),
			event.color,
			event.tags,
			creatorDTO,
			participants,
			joined,
		);

		return event;
	}

	async resetEvents(): Promise<void> {
		await this.db.$transaction([
			this.db.eventParticipants.deleteMany({}),
      		this.db.$executeRaw`ALTER SEQUENCE "Event_id_seq" RESTART WITH 1;`,
      		this.db.event.deleteMany({}),
		]);

	}
}



