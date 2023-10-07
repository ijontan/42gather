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
