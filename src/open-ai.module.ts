import { DynamicModule, Global, Module, OnModuleInit } from '@nestjs/common';
import { OpenAIService } from './open-ai.service';
import {
  OpenAIModuleAsyncOptions,
  OpenAIModuleOptions,
} from './options.interface';
import { OpenAIClientProvider } from './open-ai-client.provider';

@Global()
@Module({})
export class OpenAIModule {
  static forRoot(options: OpenAIModuleOptions): DynamicModule {
    return {
      module: OpenAIModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        OpenAIClientProvider,
        OpenAIService,
      ],
      exports: [OpenAIService],
    };
  }

  static forRootAsync(asyncOptions: OpenAIModuleAsyncOptions): DynamicModule {
    return {
      module: OpenAIModule,
      imports: asyncOptions.imports,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useFactory: asyncOptions.useFactory,
          inject: asyncOptions.inject || [],
        },
        OpenAIClientProvider,
        OpenAIService,
      ],
      exports: [OpenAIService],
    };
  }
}
