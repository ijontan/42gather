import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserService } from 'src/user/user.service';
import { Event, EventParticipants, User } from '@prisma/client';
import { eventDataDTO, eventHoverDTO, eventCreationDTO } from 'src/dto/event.dto';

@Injectable()
export class EventsService {
	constructor(private db: DatabaseService, private userService: UserService) {}

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
		this.joinEvent(eventID, token);
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



