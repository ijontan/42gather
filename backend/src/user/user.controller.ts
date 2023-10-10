import { Body, Controller, Get, Headers, Post, UseGuards, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "src/guard/auth.guard";

@Controller("user")
export class UserController{
	constructor(private readonly UserService: UserService){}

	@Get()
	@UseGuards(AuthGuard)
	async getUserData(@Headers("Authorization") token: any): Promise<any>{
		const userData = await this.UserService.getUserData(token);
		console.log("User Data:", userData);
		return (userData);
	}

	@Post("discord")
	@UseGuards(AuthGuard)
	async setDiscordID(@Headers("Authorization") intraToken: any, @Body() body: any): Promise<any>{
		console.log("Body:", body);
		return (await this.UserService.setDiscordID(intraToken, body));
	}

	@Get("all")
	@UseGuards(AuthGuard)
	async getAllUsers(): Promise<any>{
		return await this.UserService.getAllUsers();
	}

	@Get("id/:id")
	async getUserByID(@Param("id") id: string): Promise<any>{
		return await this.UserService.getUserByID(id);
	}
}