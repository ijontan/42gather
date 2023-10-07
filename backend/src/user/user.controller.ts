import { Controller, Get, Headers } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController{
	constructor(private readonly UserService: UserService){}

	@Get()
	async getUserData(@Headers("Authorization") token: any): Promise<any>{
		return (await this.UserService.getUserFromToken(token));
	}
}