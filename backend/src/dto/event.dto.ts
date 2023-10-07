
export class eventDataDTO{
	constructor(
		title: string, 
		description: string, 
		venue: string, 
		time: 
		Date, currentParticipants: number){
		this.title = title;
		this.description = description;
		this.venue = venue;
		this.time = time;
		this.currentParticipants = currentParticipants;
		}

	title: string;
	description: string;
	venue: string;
	time: Date;
	currentParticipants: number;
}

export class eventCreationDTO{
	constructor(
		title: string, 
		description: string, 
		venue: string, 
		time: Date, 
		Tags: string[], 
		Reminder: string[]){
		this.title = title;
		this.description = description;
		this.venue = venue;
		this.time = time;
		this.Tags = Tags;
		this.Reminder = Reminder;
		}

	title: string;
	description: string;
	venue: string;
	time: Date;
	Tags: string[];
	Reminder: string[];
}