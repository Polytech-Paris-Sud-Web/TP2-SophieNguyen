import { Author } from "../author/author";

/**
 * Represents a blog article
 */
export interface Article {
  id: number;
  title: string;
  content: string;
  author: Author;
  publishedOn: Date;
}
