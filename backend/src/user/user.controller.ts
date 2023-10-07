import { Body, Controller, Get, Head, Headers, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController{
	constructor(private readonly UserService: UserService){}

	@Get()
	async getUserData(@Headers("Authorization") token: any): Promise<any>{
		const userData = await this.UserService.getUserData(token);
		console.log("User Data:", userData);
		return (userData);
	}

	@Post("discord")
	async setDiscordID(@Headers("Authorization") intraToken: any, @Body() body: any): Promise<any>{
		console.log("Body:", body);
		return (await this.UserService.setDiscordID(intraToken, body));
	}	
}