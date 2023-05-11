import { BaseEntity } from 'src/common/utils/base.entity'
import { Column, Entity } from 'typeorm'

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @Column()
    name: string

    @Column()
    email: string

    @Column()
    birthDay: Date
}
