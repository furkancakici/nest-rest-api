import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserModule } from 'src/user/user.module'
import { LocalStrategy } from './strategy/local.strategy'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategy/jwt.strategy'

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({ secret: `${process.env.JWT_SECRET_KEY}`, signOptions: { expiresIn: '1d' } })
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule {}
