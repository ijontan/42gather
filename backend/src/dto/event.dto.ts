export class eventHoverDTO{
	constructor(id: number, title: string, description: string, venue: string, time: Date){
		this.id = id;
		this.title = title;
		this.description = description;
		this.venue = venue;
		this.time = time;
	}
	
	id : number;
	title: string;
	description: string;
	venue: string;
	time: Date;
}


export class eventDataDTO{
	constructor(
		id: number,
		title: string, 
		description: string, 
		venue: string, 
		time: 
		Date, currentParticipants: string[]){
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
	currentParticipants: string[];
}

export class eventCreationDTO{
	constructor(
		title: string, 
		description: string, 
		venue: string, 
		time: Date, 
		maxParticipants: number,
		color: number,
		tags: string[], 
		reminder: number[]){
		this.title = title;
		this.description = description;
		this.venue = venue;
		this.time = time;
		this.maxParticipants = maxParticipants;
		this.color = color;
		this.tags = tags;
		this.reminder = reminder;
		}
	
	title: string;
	description: string;
	venue: string;
	time: Date;
	maxParticipants: number;
	color: number;
	tags: string[];
	reminder: number[];
}