import { registerDecorator, ValidationOptions } from 'class-validator'

export function IsAdult(validationOptions?: ValidationOptions) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsAdult',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    const today = new Date()
                    const birthDay = new Date(value)
                    const age = today.getFullYear() - birthDay.getFullYear()

                    if (age < 18) {
                        return false
                    }
                    return true
                }
            }
        })
    }
}
