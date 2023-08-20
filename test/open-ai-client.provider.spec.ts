import { OpenAIClientProvider } from '../src/open-ai-client.provider';
import OpenAIApi from 'openai';

describe('OpenAiClientProvider', () => {
  it('should provide an instanced openai client', () => {
    const provider = new OpenAIClientProvider({
      model: 'model',
      apiKey: 'api-key',
    });

    expect(provider.openai).toBeDefined();
    expect(provider.openai).toBeInstanceOf(OpenAIApi);
  });
});
