import { UUID } from "crypto";

export interface Chapter {
  id: UUID;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  user_id: UUID;
  status: "draft" | "published" | "archived";
  published_at?: string;
  thumbnail?: string;
}

export interface lesson {

}