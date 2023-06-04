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
        newUser.username = createUserDto.username
        newUser.email = createUserDto.email
        newUser.password = createUserDto.password

        const result = await this.userRepository.save(newUser)

        return result
    }

    async findAll() {
        const result = await this.userRepository.find()

        return result
    }

    async findOne(id: string) {
        const result = await this.userRepository.findOneBy({ id })

        return result
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const result = await this.userRepository.update(id, updateUserDto)

        return result
    }

    async remove(id: string) {
        const user = await this.userRepository.findOneBy({ id })
        await this.userRepository.softDelete({ id })

        return user
    }
}
