import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { TransformInterceptor } from './common/interceptors/transform/transform.interceptor'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
    app.useGlobalInterceptors(new TransformInterceptor())

    app.setGlobalPrefix(`${process.env.API_PREFIX}/v${process.env.API_VERSION}`)

    const config = new DocumentBuilder()
        .setTitle('nest-rest-api')
        .setDescription('Nest example api')
        .setVersion(`${process.env.API_VERSION}.0`)
        .addTag('nest-rest')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, document)

    await app.listen(5500)
}
bootstrap()
