import { DynamicModule, Global, Module, OnModuleInit } from '@nestjs/common';
import { OpenAIService } from './open-ai.service';
import {
  OpenAIModuleAsyncOptions,
  OpenAIModuleOptions,
} from './options.interface';
import { OpenAiClientProvider } from './open-ai-client.provider';

@Global()
@Module({})
export class OpenAiModule {
  static forRoot(options: OpenAIModuleOptions): DynamicModule {
    return {
      module: OpenAiModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        OpenAiClientProvider,
        OpenAIService,
      ],
      exports: [OpenAIService],
    };
  }

  static forRootAsync(asyncOptions: OpenAIModuleAsyncOptions): DynamicModule {
    return {
      module: OpenAiModule,
      imports: asyncOptions.imports,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useFactory: asyncOptions.useFactory,
          inject: asyncOptions.inject || [],
        },
        OpenAiClientProvider,
        OpenAIService,
      ],
      exports: [OpenAIService],
    };
  }
}
