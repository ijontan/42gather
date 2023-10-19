import { Injectable } from "@nestjs/common";
import { IntraValidationCodeDTO } from "src/dto/auth.dto";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService{
	constructor (private readonly UserService: UserService){}

	/**
	 * Use the code to get the token.
	 * Also compare the token with user in database and update the database if needed
	 * Return the token
	 */
	async getToken(body: any): Promise<string>{
		let postData = new IntraValidationCodeDTO(body.code);
		let apiResponse = await fetch("https://api.intra.42.fr/oauth/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(postData),
		});
		let res = await apiResponse.json();
		let token = res.access_token;
		
		if (token){
			console.log("Token:", token);
			try{
				let userData = await this.UserService.getUserDataFromToken(token);
				console.log("User data:", userData.login);
				//Check whether the user is in database
				const user_present = await this.UserService.FindUserByIntraID(userData.login);
				//If yes, check the access token and update if needed
				if (user_present){
					if (await this.UserService.CheckTokenPresent(token, userData.login)){
						console.log("Token still valid");
					}
					else{
						console.log("Token not identical. Updating ...");
						let ret = await this.UserService.UpdateUserToken(userData.login, token);
						console.log("ret:", ret);
					}
				}
				//If not, add the user to database
				else {
					console.log("User not present.Adding ...");
					await this.UserService.AddUser(token);
				}
				console.log("Token: " + token);
				return token;
			}
			catch(e){
				console.log("Bad token");
				throw new Error("Bad token");
			}
		}
		else{
			console.log("empty token");
			throw new Error("Empty token");
		}
	}
}

