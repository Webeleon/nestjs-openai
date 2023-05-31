import { OpenAiModule } from '../src';

describe('OpenAiModule', () => {
  it('should take a configuration object and return a module definition', () => {
    const module = OpenAiModule.forRoot({
      model: 'model',
      apiKey: 'api-key',
    });

    expect(module).toBeDefined();
    expect(module).toHaveProperty('module', OpenAiModule);
    expect(module).toHaveProperty('providers');
    expect(module).toHaveProperty('exports');
  });

  it('should take an async configuration object and return a module definition', () => {
    const module = OpenAiModule.forRootAsync({
      useFactory: () => ({
        model: 'model',
        apiKey: 'api-key',
      }),
    });

    expect(module).toBeDefined();
    expect(module).toHaveProperty('module', OpenAiModule);
    expect(module).toHaveProperty('providers');
    expect(module).toHaveProperty('exports');
  });
});
