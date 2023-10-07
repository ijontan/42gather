import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService{
	async getUserFromToken(token: string): Promise<string>{
		let userData = await fetch("https://api.intra.42.fr/v2/me", {
			method: "GET",
			headers:{
				"Authorization": token,
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
		// return {name: name, token: token};
		return name;
	}
}