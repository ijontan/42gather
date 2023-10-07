export class UserDataDTO{
	constructor (intraID: string, fullName: string, imageLink: String){
		this.intraID = intraID;
		this.name = fullName;
		this.imageLink = imageLink;
	}

	intraID: string;
	name: string;
	imageLink: String;
}