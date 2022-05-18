/**
 * Fields to fill by user and to send to API for creating articles
 */
export interface ArticleCreation {
  title: string;
  content: string;
  authorId: number;
  publishedOn: Date;
}
