import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'
import { IsAdult } from './user.validation'

export class CreateUserDto {
    @ApiProperty({ description: 'The name of the user', example: 'Furkan Çakıcı' })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ description: 'The email of the user', example: 'furkancakici25@gmail.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({ description: 'The password of the user', example: '123456' })
    @Length(6, 20, {
        message(validationArguments) {
            return `Password must be between ${validationArguments.constraints[0]} and ${validationArguments.constraints[1]} characters`
        }
    })
    @IsString()
    password: string

    @ApiProperty({ description: 'The birthDay of the user', example: '1998-05-25' })
    @IsDateString()
    @IsAdult({ message: 'You must be over 18 years old' })
    birthDay?: Date
}
