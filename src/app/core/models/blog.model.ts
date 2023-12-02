export interface IBlog {
  id?: number;
  title?: string | null;
  description?: string | null;
  image?: string | null;
  createdAt?: string | null;
  comment?: number | null;
}
export interface ICommentBlog {
  id?: number;
  title?: string | null;
  name?: string | null;
  email?: string | null;
  message?: string | null;
  blog?: IBlog | null;
}
