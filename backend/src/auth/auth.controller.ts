import { Body, Controller, Get, Headers, Post, Res, Req } from "@nestjs/common";
import { Response,Request } from "express";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(private readonly AuthService: AuthService){}

	@Get()
	async Validate(@Req() request: Request, token: any, @Res() res: Response): Promise<void>{
		// console.log(request.headers)
		const statusCode = await this.AuthService.validate(token);
		if (statusCode == 200){
			res.status(200).send();
			console.log("Validated")

		}
		else{
			res.status(403).send();
			console.log("Not validated")
	
		}
	}

	@Post()
	async getToken(@Body() body: any): Promise<any>{
		const ret = await this.AuthService.getToken(body);
		console.log("ret", ret);
		return ret;
	}

}