import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";
import { UserDataDTO } from "src/dto/user.dto";

@Injectable()
export class UserService{
	constructor(private db: DatabaseService){}

	/**
	 * Use the Intra API to get the user data from the token.
	 * Used internally only
	 */
	async getUserDataFromToken(token: string): Promise<any>{
		let userData = await fetch("https://api.intra.42.fr/v2/me", {
			method: "GET",
			headers:{
				"Authorization": "Bearer " + token,
			},
		});
		if (userData.status != 200){
			console.log("Failed to get user data");
			throw new Error("Bad return");
		}
		return (await userData.json());
	}

	/**
	 * Get the user data from the token
	 * Return a UserDataDTO
	 */
	async getUserData(token: string): Promise<UserDataDTO>{
		let tokenCode = token.split(" ")[1];
		try{
			let userData = await this.getUserDataFromToken(tokenCode);
			const user = await this.db.user.findUnique({
				where: {
					intraID: userData.login,
				},
			});

			if (!user){
				throw new Error("User not found");
			}
			return new UserDataDTO(user.intraID, user.name, user.imageLink);
		}
		catch(e){
			throw new Error("Bad token");
		}
	}

	/**
	 * Get the intraID from the token
	 */
	async getIntraIDFromToken(token: string): Promise<string>{
		try{
			let userData = await this.getUserDataFromToken(token);
			return userData.login;
		}
		catch(e){
			throw new Error("Bad token");
		}
	}

	/**
	 * Search the user in database by intraID
	 */
	async FindUserByIntraID(intraId: string){
		return this.db.user.findUnique({
			where: {
				intraID: intraId,
			},
		});
	}

	/**
	 * Check whether the token is present in database
	 */
	async CheckTokenPresent(token: string): Promise<boolean>{
		let user = await this.db.user.findMany({
			where: {
				token: token,
			},
		});
		if (user.length > 0){
			return true;
		}
		else{
			return false;
		}
	}

	/**
	 * Add new user to database
	 */
	async AddUser(token: string): Promise<User>{
		try{
			let userData = await this.getUserDataFromToken(token);
			let intraId = userData.login;
			let name = userData.displayname;
			let photo = userData.image.link;
			return this.db.user.create({
				data:{
					intraID: intraId,
					name: name,
					imageLink: photo,
					token: token,
				}
			})
		}
		catch{
			throw new Error("Bad token");
		}
	}

	async UpdateUserToken(intraID: string, new_token: string){
		let user = await this.db.user.findUnique({
			where: {
				intraID: intraID,
			},
		});
		if (!user){
			throw new Error("User not found");
		}
		user.token = new_token;
	}
}