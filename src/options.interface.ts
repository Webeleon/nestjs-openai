export const CONFIG_OPTIONS = 'CONFIG_OPTIONS';

export interface OpenAIModuleOptions {
  apiKey: string;
  model: string;
}

export interface OpenAIModuleAsyncOptions {
  imports?: any[];
  inject?: any[];
  useFactory: (
    ...args: any[]
  ) => Promise<OpenAIModuleOptions> | OpenAIModuleOptions;
}
