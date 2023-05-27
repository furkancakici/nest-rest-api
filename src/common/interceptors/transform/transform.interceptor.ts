import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { map, Observable } from 'rxjs'

export interface Response<T> {
    statusCode: number
    message: string
    data: T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        return next.handle().pipe(
            map(data => ({
                statusCode: context.switchToHttp().getResponse().statusCode,
                message: data.message || '',
                data: data.result || data
            }))
        )
    }
}
