import { User } from "@prisma/client";
import { UserDataDTO } from "./user.dto";

export enum TagType {
	evaluation=0,
    activity=1,
    rush=2,
    dinner=3,
    badminton=4,
    jogging=5,
    gaming=6,
    movie=7,
}

export enum ReminderType {
	"5min"=0,
	"15min"=1,
	"1hour"=2,
	"1day"=3,
	"1week"=4,
}


export class eventDataDTO{
	constructor(
		id: number,
		title: string, 
		description: string | null, 
		venue: string | null, 
		datetime: string |null,
		color: number,
		tags: number[] | null,
		creator: UserDataDTO,
		currentParticipants: UserDataDTO[],
		joined: boolean,
		comment: string[] | null){
		this.id = id;
		this.title = title;
		this.description = description;
		this.venue = venue;
		this.datetime = datetime;
		this.color = color;
		this.tags = tags;
		this.creator = creator;
		this.currentParticipants = currentParticipants;
		this.joined = joined;
		this.comment = comment;
		}

	id: number;
	title: string;
	description: string | null;
	venue: string | null;
	datetime: string;
	color: number;
	tags: number[] | null;
	creator: UserDataDTO;
	currentParticipants: UserDataDTO[];
	joined: boolean;
	comment: string[] | null;
}

export class eventCreationDTO{
	constructor(
		title: string, 
		description: string | null, 
		venue: string | null, 
		datetime: string, 
		limit: number | null,
		color: number,
		tags: number[] | null, 
		reminders: number[] | null,
		preJoinedMemberID : number[] | null,
		){
		this.title = title;
		this.description = description;
		this.venue = venue;
		this.datetime = datetime;
		this.limit = limit;
		this.color = color;
		this.tags = tags;
		this.reminders = reminders;
		this.preJoinedMemberID = preJoinedMemberID;
		}
	
	title: string;
	description: string |null;
	venue: string |null;
	datetime: string;
	limit: number | null;
	color: number;
	tags: number[] |null;
	reminders: number[] |null;
	preJoinedMemberID : number[] |null;
}

export class EventReminderDTO{
	constructor(time: Date, eventID: number){
		this.time = time;
		this.eventID = eventID;
	}
	time: Date;
	eventID: number;
}