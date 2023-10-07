import { Injectable } from "@nestjs/common";
import { IntraValidationCodeDTO } from "src/dto/auth.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService{
	constructor (private readonly UserService: UserService){}
	private tokens: string[] = [];

	/**
	 * Validate the token in header
	 */
	async validate(token: any): Promise<any>{
		let tokenCode = token.split(" ")[1];
		if (await this.UserService.CheckTokenPresent(tokenCode)){
			console.log("Token present");
			return 200;
		}
		else{
			console.log("Token not present");
			return 403;
		}
	}

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

		try{
			let intraID = await this.UserService.getIntraIDFromToken(token);
			//Check whether the user is in database
			const user_present = await this.UserService.FindUserByIntraID(intraID);
			//If yes, check the access token and update if needed
			if (user_present){
				if (await this.UserService.CheckTokenPresent(token)){
					console.log("Token present");
				}
				else{
					console.log("Token not present. Updating ...");
					await this.UserService.UpdateUserToken(intraID, token);
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
}