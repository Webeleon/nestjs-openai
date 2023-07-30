import { OpenAIService } from '../src';
import { OpenAiClientProvider } from '../src/open-ai-client.provider';
import { OpenAIApi } from 'openai';
import { Role } from '../src';
import { Models } from '../src';

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
        createImage: jest.fn().mockResolvedValue({
          data: {
            data: [
              {
                url: 'https://webeleon.dev',
              },
            ],
          },
        }),
      } as unknown as OpenAIApi,
    } as OpenAiClientProvider;
    service = new OpenAIService(
      { model: Models.GP3_5_TURBO },
      openAiClientProviderMock,
    );
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
        model: 'gpt-3.5-turbo',
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

  describe('image generation', () => {
    it('should generate image urls', async () => {
      const images = await service.generateImageUrls({
        prompt: 'a black cat',
        user: 'webeleon',
      });

      expect(images[0]).toBe('https://webeleon.dev');
    });

    it('should generate image buffers', async () => {
      openAiClientProviderMock.openai.createImage = jest
        .fn()
        .mockResolvedValue({
          data: {
            data: [
              {
                b64_json: Buffer.from('coco').toString('base64'),
              },
            ],
          },
        });

      const images = await service.generateImagePngBuffers({
        prompt: 'a black cat',
        user: 'webeleon',
      });

      expect(images[0]).toBeInstanceOf(Buffer);
    });
  });
});
