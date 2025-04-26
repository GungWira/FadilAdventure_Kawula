import { UUID } from "crypto";

interface Profile {
  name: string;
  umur: string;
  username: string;
  fullname: string;
  user_id: UUID;
  created_at?: string;
}

export interface CreateProfileResponse {
  data: Profile | null;
  error: Error | null;
}
