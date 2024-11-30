import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';

import { AppModule } from './app.module';

// Setup
async function bootstrap() {
  const app = await NestFactory.create(AppModule, getOptions());
  const logger = app.get(Logger);

  configureLogger(app);
  configureSecurityPlugins(app);

  await app.listen(getPort(app));

  logger.log(`Application is available on: ${await getUrl(app)}`);
}

// Helpers
function getOptions(): NestApplicationOptions {
  return {
    bufferLogs: true,
  };
}

function getPort(app: INestApplication): number {
  const config = app.get(ConfigService);

  return config.get('port') as number;
}

async function getUrl(app: INestApplication): Promise<string> {
  const rawUrl = await app.getUrl();

  return rawUrl.replace(/\[([^\]]+)\]/, 'localhost');
}

function configureLogger(app: INestApplication) {
  const logger = app.get(Logger);
  app.useLogger(logger);
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
}

function configureSecurityPlugins(app: INestApplication) {
  app.use(helmet());
  app.enableCors();
}

// Init
bootstrap();
