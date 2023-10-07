import { Injectable } from "@nestjs/common";
import { IntraValidationCodeDTO } from "src/dto/auth.dto";


@Injectable()
export class AuthService{
	private tokens: string[] = [];

	async validate(token: any): Promise<any>{
		let tokenCode = token.split(" ")[1];
		if (this.tokens.includes(tokenCode)){
			return 200;
		}
		else{
			return 403;
		}
	}

	//Use the code to get the access token
	async getToken(body: any): Promise<string>{
		let data = new IntraValidationCodeDTO(body.code);
		console.log("data", data);
		let apiResponse = await fetch("https://api.intra.42.fr/oauth/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		let ret = await apiResponse.json();
		let token = ret.access_token;

		this.tokens.push(token);
		return token;		
	}
}