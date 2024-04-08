export interface Issue {
  title: string;
  number: number;
  created_at: Date;
  user: { login: string };
  comments: number;
}