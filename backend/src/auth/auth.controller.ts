import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(private readonly AuthService: AuthService){}

	@Get()
	Validate(@Body() body:any): Promise<any>{
		return this.AuthService.validate();
	}

	@Post()
	getToken(@Body() body: any): Promise<any>{
		return this.AuthService.getToken(body);
	}

}