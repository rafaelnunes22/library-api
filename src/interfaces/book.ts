export interface IBookDTO {
  id?: string;
  title: string;
  description: string;
  image_url: string;
  release_date: Date;
  is_rented: boolean;
  user_id?: string;
}