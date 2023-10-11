import { Body, Controller, Get, Headers, Post, Res, Req, UseGuards } from "@nestjs/common";
import { Response, Request } from "express";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guard/auth.guard";

@Controller("auth")
export class AuthController {
	constructor(private readonly AuthService: AuthService){}

	@Get()
	@UseGuards(AuthGuard)
	async Validate(@Headers("Authorization") token: any, @Res() res: Response): Promise<void>{
		console.log("Get auth");
		res.status(200).send("OK");
	}

	@Post()
	async getToken(@Body() body: any): Promise<any>{
		console.log("Post auth");
		return (await this.AuthService.getToken(body));
	}

}