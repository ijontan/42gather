import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable} from "rxjs";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor (private readonly UserService: UserService){}
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

		const request = context.switchToHttp().getRequest();
		const token = request.headers.authorization;
		let tokenCode = token.split(" ")[1];
		return (this.UserService.CheckTokenPresent(tokenCode));
	}
}