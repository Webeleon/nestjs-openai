import { Inject, Injectable } from '@nestjs/common';
import { Message, Role } from './message.dto';
import { OpenAiClientProvider } from './open-ai-client.provider';
import { OpenAIApi } from 'openai';
import { CONFIG_OPTIONS } from './options.interface';

@Injectable()
export class OpenAIService {
  openai: OpenAIApi;
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly config,
    private readonly openaiProvider: OpenAiClientProvider,
  ) {
    this.openai = openaiProvider.openai;
  }

  async chat(
    prompt: string,
    userId: string,
    history: Message[] = [],
    role: Role = Role.USER,
  ): Promise<string> {
    const messages: Message[] = [
      ...history,
      {
        role,
        content: prompt,
        name: userId,
      },
    ];
    const completion = await this.openai.createChatCompletion({
      model: this.config.model,
      user: userId,
      messages,
    });

    return completion.data.choices[0].message.content;
  }
}
