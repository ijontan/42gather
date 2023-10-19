import { eventDataDTO } from "./event.dto";

export class UserDataDTO{
	constructor (id:number, intraName: string, fullName: string, imageLink: string, discordID: string | null = null){
		this.id = id;
		this.intraName = intraName;
		this.name = fullName;
		this.imageLink = imageLink;
		this.discordID = discordID;
	}
	id: number;
	intraName: string;
	name: string;
	imageLink: string;
	discordID: string | null;
}


export class UserDetailDTO{
	constructor (intraName: string, name:string, imageLink:string, discordID: string, joinedEvent: number, createdEvent: number, allEvents: any[]){
		this.intraName = intraName;
		this.name = name;
		this.imageLink = imageLink;
		this.discordID = discordID;
		this.joinedEvent = joinedEvent;
		this.createdEvent = createdEvent;
		this.allEvents = allEvents;
	}

	intraName : string;
	name: string;
	imageLink: string;
	discordID: string | null;
	joinedEvent: number;
	createdEvent: number;
	allEvents: any[];

}

export class UserBriefDTO{
	constructor (id: number, intraName: string, name: string, imageLink: string, discordID: string, joinedEvent: number, createdEvent: number){
		this.id = id;
		this.intraName = intraName;
		this.name = name;
		this.imageLink = imageLink;
		this.discordID = discordID;
		this.joinedEvent = joinedEvent;
		this.createdEvent = createdEvent;
	}

	id : number;
	intraName: string;
	name: string;
	imageLink: string;
	discordID: string | null;
	joinedEvent: number;
	createdEvent: number;
}