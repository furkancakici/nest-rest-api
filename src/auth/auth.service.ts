import { UserService } from './../user/user.service'
import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { User } from 'src/user/entities/user.entity'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(username: string, password: string) {
        const user = await this.userService.findOneByUsername(username)

        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, username, email } = user

            return { username, email }
        }
        return null
    }

    async login(user: User) {
        const payload = { username: user.username, sub: user.email }
        return {
            ...user,
            access_token: this.jwtService.sign(payload)
        }
    }
}
