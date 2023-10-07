import { Injectable } from "@nestjs/common";
import { IntraValidationCodeDTO } from "src/dto/auth.dto";


@Injectable()
export class AuthService{
	async validate(): Promise<any>{
		//Validate user data
	}

	//Use the code to get the access token
	async getToken(body: any): Promise<any>{
		let data = new IntraValidationCodeDTO(body.code);
		console.log("data", data);
		let apiResponse = await fetch("https://api.intra.42.fr/oauth/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		let ret = await apiResponse.json();
		let token = ret.access_token;
		
		console.log("token", token);

		//Get user data from token
		let userData = await fetch("https://api.intra.42.fr/v2/me", {
			method: "GET",
			headers:{
				"Authorization": "Bearer " + token,
			},
		});
		if (userData.status != 200){
			return "Error";
		}
		let log = await userData.json();
		let intraId = log.login;
		let name = log.displayname;
		console.log("intraId", intraId);
		console.log("name", name);
		// console.log("userData", log);
		//check whether the user data is in database
		//return the user full name
		return name;
	}
}