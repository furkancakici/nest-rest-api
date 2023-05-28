import { Injectable } from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { Repository } from 'typeorm'
import { Auth } from './entities/auth.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class AuthService {
    constructor(@InjectRepository(Auth) private readonly authRepository: Repository<Auth>) {}

    async signinLocal(createAuthDto: CreateAuthDto) {
        const result = this.authRepository.findOneBy({ email: createAuthDto.email })

        return result
    }

    async create(createAuthDto: CreateAuthDto) {
        const newAuth = new Auth()
        newAuth.name = createAuthDto.name
        newAuth.email = createAuthDto.email
        newAuth.birthDay = createAuthDto.birthDay
        newAuth.password = createAuthDto.password

        const result = await this.authRepository.save(newAuth)

        return result
    }

    async findAll() {
        const result = await this.authRepository.find()

        return result
    }

    async findOne(id: string) {
        const result = await this.authRepository.findOneBy({ id })

        return result
    }

    async update(id: number, updateUserDto: UpdateAuthDto) {
        const result = await this.authRepository.update(id, updateUserDto)

        return result
    }

    async remove(id: string) {
        const user = await this.authRepository.findOneBy({ id })
        await this.authRepository.softDelete({ id })

        return user
    }
}
