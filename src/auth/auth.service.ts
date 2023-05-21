import { Injectable } from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { Repository } from 'typeorm'
import { Auth } from './entities/auth.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class AuthService {
    constructor(@InjectRepository(Auth) private readonly authRepository: Repository<Auth>) {}

    async create(createAuthDto: CreateAuthDto) {
        const newUser = new Auth()
        newUser.name = createAuthDto.name
        newUser.email = createAuthDto.email
        newUser.birthDay = createAuthDto.birthDay
        newUser.password = createAuthDto.password

        const result = this.authRepository.save(newUser)

        if (!result) return { success: false, message: '', result }
        return { success: true, message: '', result: newUser }
    }

    async findAll() {
        const result = await this.authRepository.find()

        if (!result) return { success: false, message: '', result }
        return { success: true, message: '', result }
    }

    async findOne(id: string) {
        const result = await this.authRepository.findOneBy({ id })

        if (!result) return { success: false, message: '', result }
        return { success: true, message: '', result }
    }

    async update(id: number, updateUserDto: UpdateAuthDto) {
        const result = await this.authRepository.update(id, updateUserDto)

        if (!result) return { success: false, message: '', result }
        return { success: true, message: '', result: updateUserDto }
    }

    async remove(id: string) {
        const user = await this.authRepository.findOneBy({ id })
        const result = await this.authRepository.softDelete({ id })

        if (!result) return { success: false, message: '', result: user }
        return { success: true, message: '', result: user }
    }
}
