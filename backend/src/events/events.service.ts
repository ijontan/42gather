import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserService } from 'src/user/user.service';
import { eventDataDTO, eventHoverDTO, eventCreationDTO } from 'src/dto/event.dto';

@Injectable()
export class EventsService {
	constructor(private db: DatabaseService, private userService: UserService) {}

	async createEvent(eventCreationDTO: eventCreationDTO, token: string): Promise<any> {
		let tokenCode = token.split(' ')[1];
		let userID = await this.userService.getIDFromToken(tokenCode);
		console.log(userID);
		const { title, description, venue, time, color, maxParticipants, tags,reminder } = eventCreationDTO;
		let event = await this.db.event.create({
			data: {
				title: title,
				description: description,
				venue: venue,
				time: time,
				color: color,
				maxParticipants: maxParticipants,
				tags: tags,
				reminder: reminder,
				creator: {
					connect: {id: userID},
				},
			},
		});


	}
}



