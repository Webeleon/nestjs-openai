import { OpenAIModule, Models, OpenAIService } from '../src';
import { Test } from '@nestjs/testing';

describe('OpenAiModule integration specs', () => {
  it('should work with forRoot', async () => {
    const module = await Test.createTestingModule({
      imports: [
        OpenAIModule.forRoot({
          model: Models.GPT4,
          apiKey: 'FAKE',
        }),
      ],
    }).compile();
    expect(module).toBeDefined();
    const openAiService = module.get<OpenAIService>(OpenAIService);
    expect(openAiService).toBeInstanceOf(OpenAIService);
  });

  it('should work with forRootAsync', async () => {
    const module = await Test.createTestingModule({
      imports: [
        OpenAIModule.forRootAsync({
          useFactory: () => ({
            model: Models.GPT4,
            apiKey: 'FAKE',
          }),
        }),
      ],
    }).compile();
    expect(module).toBeDefined();
    const openAiService = module.get<OpenAIService>(OpenAIService);
    expect(openAiService).toBeInstanceOf(OpenAIService);
  });
});
