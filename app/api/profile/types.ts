import { UUID } from "crypto";

export interface Profile {
  name: string;
  email: string;
  username: string;
  fullname: string;
  user_id: UUID;
  created_at?: string;
  culture_name : string;
}

export interface CreateProfileResponse {
  data: Profile | null;
  error: Error | null;
}
