import { Injectable } from "@nestjs/common";
import { IntraValidationCodeDTO } from "src/dto/auth.dto";


@Injectable()
export class AuthService{
	async validate(): Promise<any>{
		const code = "c298c0024ea61eae7e4375c4096896714f1ee10f81032f1bcfa2d596ef9d7983"

		let data = new IntraValidationCodeDTO(code);
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
		
		console.log("token", token);
		
	}
}