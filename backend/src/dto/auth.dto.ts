export class IntraValidationCodeDTO{
	constructor(code: string){
		this.grant_type = "authorization_code";
		this.client_id = process.env.UID;
		this.client_secret = process.env.SECRET;
		this.code = code;
		this.redirect_uri = "http://localhost:" + process.env.FE_PORT;
	}

	grant_type: string;
	client_id: string;
	client_secret: string;
	code: string;
	redirect_uri: string;
}