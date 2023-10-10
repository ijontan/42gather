import { eventDataDTO } from "./event.dto";

export class UserDataDTO{
	constructor (intraID: string, fullName: string, imageLink: string, discordID: string | null = null){
		this.intraID = intraID;
		this.name = fullName;
		this.imageLink = imageLink;
		this.discordID = discordID;
	}

	intraID: string;
	name: string;
	imageLink: string;
	discordID: string | null;
}


export class UserDetailDTO{
	constructor (intraName: string, joinedEvent: number, createdEvent: number, allEvents: any[]){
		this.intraName = intraName;
		this.joinedEvent = joinedEvent;
		this.createdEvent = createdEvent;
		this.allEvents = allEvents;
	}

	intraName : string;
	joinedEvent: number;
	createdEvent: number;
	allEvents: any[];

}

export class UserBriefDTO{
	constructor (id: number, intraName: string, joinedEvent: number, createdEvent: number){
		this.id = id;
		this.intraName = intraName;
		this.joinedEvent = joinedEvent;
		this.createdEvent = createdEvent;
	}

	id : number;
	intraName: string;
	joinedEvent: number;
	createdEvent: number;
}