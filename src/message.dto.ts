export enum Role {
  USER = 'user',
  SYSTEM = 'system',
  ASSISTANT = 'assistant',
}

export class Message {
  role: Role;
  content: string;
  name?: string;
}
