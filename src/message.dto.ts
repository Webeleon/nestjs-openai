import { Role } from './roles.enum';

export class Message {
  role: Role;
  content: string;
  name?: string;
}
