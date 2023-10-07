export class UserDataDTO{
	constructor (intraID: string, fullName: string, imageLink: String){
		this.intraID = intraID;
		this.fullName = fullName;
		this.imageLink = imageLink;
	}

	intraID: string;
	fullName: string;
	imageLink: String;
}