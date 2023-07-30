import { OpenAIModule } from '../src';

describe('OpenAiModule', () => {
  it('should take a configuration object and return a module definition', () => {
    const module = OpenAIModule.forRoot({
      model: 'model',
      apiKey: 'api-key',
    });

    expect(module).toBeDefined();
    expect(module).toHaveProperty('module', OpenAIModule);
    expect(module).toHaveProperty('providers');
    expect(module).toHaveProperty('exports');
  });

  it('should take an async configuration object and return a module definition', () => {
    const module = OpenAIModule.forRootAsync({
      useFactory: () => ({
        model: 'model',
        apiKey: 'api-key',
      }),
    });

    expect(module).toBeDefined();
    expect(module).toHaveProperty('module', OpenAIModule);
    expect(module).toHaveProperty('providers');
    expect(module).toHaveProperty('exports');
  });
});
