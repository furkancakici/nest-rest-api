import { UserService } from './../user/user.service'
import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async validateUser(username: string, password: string) {
        const user = await this.userService.findOneByUsername(username)

        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user

            return result
        }
        return null
    }
}
