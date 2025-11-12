export interface UserRecord {
  id: string;
  name: string | null;
  email: string;
  image?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface CreateUserInput {
  name: string | null;
  email: string;
  image?: string | null;
}


