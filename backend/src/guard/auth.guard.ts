import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable} from "rxjs";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor (private readonly db: DatabaseService){}
	async canActivate(context: ExecutionContext): Promise<boolean> {

		const request = context.switchToHttp().getRequest();
		const token = request.headers.authorization;
		let tokenCode = token.split(" ")[1];
		const find = await this.db.user.findFirst({
			where: {
				token: tokenCode,
			},
		});
		return (find != null)
	}
}