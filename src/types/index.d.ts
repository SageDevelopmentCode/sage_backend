export interface User {
  id: string;
  name: string;
  username: string;
  created_at: Date;
  updated_at: Date;
  password: string;
}

export interface Creature {
  id: string;
  name: string;
  type: string;
  created_at: string;
  updated_at: string;
  description?: string;
  image_url?: string;
}

export interface Post {
  id: string;
  user_id: string;
  title: string;
  content: any; // Use a more specific type based on the actual content
  post_type: string;
  created_at: string;
  updated_at: string;
}
