import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async create(createUserDto: CreateUserDto) {
        const newUser = new User()
        newUser.name = createUserDto.name
        newUser.email = createUserDto.email
        newUser.birthDay = createUserDto.birthDay

        const result = this.userRepository.save(newUser)

        if (!result) return { success: false, message: '', result }
        return { success: true, message: '', result: newUser }
    }

    async findAll() {
        const result = await this.userRepository.find()

        if (!result) return { success: false, message: '', result }
        return { success: true, message: '', result }
    }

    async findOne(id: string) {
        const result = await this.userRepository.findOneBy({ id })

        if (!result) return { success: false, message: '', result }
        return { success: true, message: '', result }
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const result = await this.userRepository.update(id, updateUserDto)

        if (!result) return { success: false, message: '', result }
        return { success: true, message: '', result: updateUserDto }
    }

    async remove(id: string) {
        const user = await this.userRepository.findOneBy({ id })
        const result = await this.userRepository.softDelete({ id })

        if (!result) return { success: false, message: '', result: user }
        return { success: true, message: '', result: user }
    }
}
