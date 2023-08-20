import OpenAIApi from 'openai';
import { Inject } from '@nestjs/common';
import { CONFIG_OPTIONS, OpenAIModuleOptions } from './options.interface';

export class OpenAIClientProvider {
  public openai: OpenAIApi;

  constructor(
    @Inject(CONFIG_OPTIONS)
    private readonly config: OpenAIModuleOptions,
  ) {
    this.openai = new OpenAIApi({
      apiKey: config.apiKey,
    });
  }
}
