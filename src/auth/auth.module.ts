import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Auth } from './entities/auth.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Auth])],
    controllers: [UserController],
    providers: [AuthService]
})
export class AuthModule {}
