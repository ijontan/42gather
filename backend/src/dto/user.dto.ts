export class UserDataDTO{
	constructor (intraID: string, fullName: string){
		this.intraID = intraID;
		this.fullName = fullName;
	}

	intraID: string;
	fullName: string;
}