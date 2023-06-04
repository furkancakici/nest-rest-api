import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateUserDto {
    @ApiProperty({ description: 'The email of the user', example: 'furkancakici25@gmail.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({ description: 'The username of the user', example: 'Furkan Çakıcı' })
    @IsString()
    @IsNotEmpty()
    username: string

    @ApiProperty({ description: 'The password of the user', example: '123456' })
    @Length(6, 20, {
        message(validationArguments) {
            return `Password must be between ${validationArguments.constraints[0]} and ${validationArguments.constraints[1]} characters`
        }
    })
    @IsString()
    password: string
}
