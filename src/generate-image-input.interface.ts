export interface GenerateImageInput {
  prompt: string;
  n?: number;
  size?: '1024x1024' | '512x512' | '256x256';
  user: string;
}
