import { OpenAIService } from '../src';
import { OpenAiClientProvider } from '../src/open-ai-client.provider';
import { OpenAIApi } from 'openai';
import { Role } from '../src/message.dto';

describe('OpenAiService', () => {
  let openAiClientProviderMock: OpenAiClientProvider;
  let service: OpenAIService;
  beforeEach(() => {
    openAiClientProviderMock = {
      openai: {
        createChatCompletion: jest.fn().mockResolvedValueOnce({
          data: {
            choices: [
              {
                message: {
                  content: 'response',
                },
              },
            ],
          },
        }),
      } as unknown as OpenAIApi,
    } as OpenAiClientProvider;
    service = new OpenAIService({ model: 'model' }, openAiClientProviderMock);
  });

  describe('chat', () => {
    it("should pass the message history and the configured model to the OpenAI API and return the bot's response", async () => {
      const response = await service.chat('prompt', 'user-id', [
        {
          role: Role.USER,
          content: 'message 1',
          name: '123',
        },
      ]);

      expect(response).toEqual('response');
      expect(
        openAiClientProviderMock.openai.createChatCompletion,
      ).toHaveBeenCalledWith({
        model: 'model',
        user: 'user-id',
        messages: [
          {
            role: 'user',
            content: 'message 1',
            name: '123',
          },
          {
            role: 'user',
            content: 'prompt',
            name: 'user-id',
          },
        ],
      });
    });
  });
});
