import { Inject, Injectable } from '@nestjs/common';
import { Message } from './message.dto';
import { OpenAIClientProvider } from './open-ai-client.provider';
import { OpenAIApi } from 'openai';
import { CONFIG_OPTIONS } from './options.interface';
import { Role } from './roles.enum';
import { GenerateImageInput } from './generate-image-input.interface';

@Injectable()
export class OpenAIService {
  openai: OpenAIApi;
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly config,
    private readonly openaiProvider: OpenAIClientProvider,
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

  async generateImagePngBuffers({
    prompt,
    n = 1,
    size = '512x512',
    user,
  }: GenerateImageInput): Promise<Buffer[]> {
    const { data } = await this.openai.createImage({
      prompt,
      n,
      size,
      user,
      response_format: 'b64_json',
    });

    return data.data.map((img) => Buffer.from(img.b64_json, 'base64'));
  }

  async generateImageUrls({
    prompt,
    n = 1,
    size = '512x512',
    user,
  }: GenerateImageInput): Promise<string[]> {
    const { data } = await this.openai.createImage({
      prompt,
      n,
      size,
      user,
      response_format: 'url',
    });

    return data.data.map((img) => img.url);
  }
}
