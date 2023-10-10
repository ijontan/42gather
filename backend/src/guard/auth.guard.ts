import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable} from "rxjs";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor (private readonly UserService: UserService){}
	async canActivate(context: ExecutionContext): Promise<boolean> {

		const request = context.switchToHttp().getRequest();
		const token = request.headers.authorization;
		let tokenCode = token.split(" ")[1];
		const userData = await fetch("https://api.intra.42.fr/v2/me", {
			method: "GET",
			headers:{
				"Authorization": "Bearer " + tokenCode,
			},
		});
		let res = await userData.status == 200;
		return res
	}
}