import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from './guards/local-auth.guard'

@Controller('auth')
export class AuthController {
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req) {
        return req.user
    }
}
