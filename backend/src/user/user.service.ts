import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";
import { UserDataDTO, UserBriefDTO, UserDetailDTO } from "src/dto/user.dto";

@Injectable()
export class UserService{
	constructor(private db: DatabaseService){}

	/**
	 * Use the Intra API to get the user data from the token.
	 * Used internally only
	 */
	async getUserDataFromToken(token: string): Promise<any>{
		const userData = await fetch("https://api.intra.42.fr/v2/me", {
			method: "GET",
			headers:{
				"Authorization": "Bearer " + token,
			},
		});
		if (userData.status !== 200){
			console.log("Status:", userData.status);
			console.log("Failed to get user data");
			throw new Error("Failed to get user data");
		}
		console.log("User data from token success");
		return (await userData.json());
	}

	/**
	 * Get the user data from the token
	 * Return a UserDataDTO, used for profile
	 */
	async getUserData(token: string): Promise<UserDataDTO>{
		let tokenCode = token.split(" ")[1];
	
		let userData = await this.getUserDataFromToken(tokenCode);
		
		const user = await this.db.user.findUnique({
			where: {
				intraID: userData.login,
			},
		});

		if (!user){
			throw new Error("User not found");
		}
		return new UserDataDTO(user.intraID, user.name, user.imageLink, user.discordID);
		
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
	 * Get the user ID from the token
	 */
	async getIDFromToken(token: string): Promise<number>{
		try{
			let userData = await this.getUserDataFromToken(token);
			const user = await this.db.user.findUnique({
				where: {
					intraID: userData.login,
				},
			});

			if (!user){
				throw new Error("User not found");
			}
			return user.id;
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
		return this.db.user.update({
			where: {
				intraID: intraID,
			},
			data: {
				token: new_token,
			},
		});
	}

	async checkDiscordIDPresent(token: String): Promise<boolean>{
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
			if (user.discordID){
				return true;
			}
			else{
				return false;
			}
		}
		catch(e){
			throw new Error("Bad token");
		}
	}

	async setDiscordID(intraToken: any, body: any): Promise<any>{
		let apiResponse = await fetch("https://discord.com/api/oauth2/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				code: body.code,
				client_id : process.env.DISCORD_UID,
				client_secret: process.env.DISCORD_SECRET,
				grant_type: "authorization_code",
				redirect_uri: process.env.DISCORD_REDIRECT,
				scope: "identify",
			}),
		});
		let res = await apiResponse.json();
		if (!res.access_token){
			throw new Error("Bad discord code");
		}

		console.log("Discord token:", res.access_token);

		const discordResponse = await fetch('https://discordapp.com/api/users/@me', {
			method: 'GET',
    		headers: {
      			Authorization: "Bearer " + res.access_token,
    		},
 	 	});

		if (discordResponse.status != 200)
		  throw new Error("Bad discord token");
		
		const discordData = await discordResponse.json();
		console.log("Discord ID:", discordData.id);

		let tokenCode = intraToken.split(" ")[1];
		console.log("Intra token:", tokenCode);
		
		let userData = await this.getUserDataFromToken(tokenCode);
		const user = await this.db.user.findUnique({
			where: {
				intraID: userData.login,
			},
		});
			
		if (!user){
			throw new Error("User not found");
		}

		return this.db.user.update({
			where: {
				intraID: userData.login,
			},
			data: {
				discordID: discordData.id,
			},
		});
	}

	/**
	 * Get all users from database, return a list of UserBriefDTO
	 */
	async getAllUsers(): Promise<any>{
		const users = await this.db.user.findMany({
			include:{
				createdEvents: true,
				joinedEvents: true,
			},
		});

		const usersBrief = users.map((user) => {
			return new UserBriefDTO(
				user.id,
				user.intraID,
				user.name,
				user.imageLink,
				user.discordID,
				user.createdEvents.length,
				user.joinedEvents.length,
			);
		});
		console.log("Users:", usersBrief);
		return usersBrief;
	}

	/**
	 * Get user by ID, return a UserDetailDTO.
	 * Used for admin dashboard to get user detail
	 */
	async getUserByID(id: string): Promise<any>{
		const user = await this.db.user.findUnique({
			where: {
				id: parseInt(id),
			},
			include: {
				createdEvents: true,
				joinedEvents: true,
			},
		});
		if (!user){
			throw new Error("User not found");
		}
		const userDetail = new UserDetailDTO(
			user.intraID,
			user.name,
			user.imageLink,
			user.discordID,
			user.createdEvents.length,
			user.joinedEvents.length,
			user.joinedEvents,
		);
		return userDetail;
	}
}