import { Controller, Get, Headers } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController{
	constructor(private readonly UserService: UserService){}

	@Get()
	async getUserData(@Headers("Authorization") token: any): Promise<any>{
		const userData = await this.UserService.getUserData(token);
		return (userData);
	}
}