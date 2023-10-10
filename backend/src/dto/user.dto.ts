import { eventDataDTO } from "./event.dto";

export class UserDataDTO{
	constructor (intraID: string, fullName: string, imageLink: String, discordID: string | null = null){
		this.intraID = intraID;
		this.name = fullName;
		this.imageLink = imageLink;
		this.discordID = discordID;
	}

	intraID: string;
	name: string;
	imageLink: String;
	discordID: string | null;
}

// participants: [
// 	{
// 	  id: 1,
// 	  intraID: 'zah',
// 	  name: 'Ze Hao Ah',
// 	  token: '4ee78e776c629f9179e4a078d30c911f17bff68c8fe7e33a5da45557dfafba79',
// 	  imageLink: 'https://cdn.intra.42.fr/users/f3256f5f9a27ec01afcabe430095c41b/zah.jpg',
// 	  discordID: '704685246309728306',
// 	  discordToken: null
// 	},


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