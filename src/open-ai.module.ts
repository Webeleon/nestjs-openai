import { DynamicModule, Module } from '@nestjs/common';
import { OpenAIService } from './open-ai.service';
import {
  OpenAIModuleAsyncOptions,
  OpenAIModuleOptions,
} from './options.interface';
import { OpenAiClientProvider } from './open-ai-client.provider';

@Module({})
export class OpenAiModule {
  private static _module: DynamicModule;

  static forFeature() {
    return OpenAiModule._module;
  }

  static forRoot(options: OpenAIModuleOptions) {
    OpenAiModule._module = {
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

    return OpenAiModule._module;
  }

  static forRootAsync(asyncOptions: OpenAIModuleAsyncOptions) {
    OpenAiModule._module = {
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

    return OpenAiModule._module;
  }
}
