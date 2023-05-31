import { Configuration, OpenAIApi } from 'openai';
import { Inject } from '@nestjs/common';
import { CONFIG_OPTIONS, OpenAIModuleOptions } from './options.interface';

export class OpenAiClientProvider {
  public openai: OpenAIApi;

  constructor(
    @Inject(CONFIG_OPTIONS)
    private readonly config: OpenAIModuleOptions,
  ) {
    this.openai = new OpenAIApi(
      new Configuration({
        apiKey: config.apiKey,
      }),
    );
  }
}
