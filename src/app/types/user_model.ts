export interface UserResponse {
  uid?: number;
  role?: number;
  email?: string;
  full_name?: string;
  password?: string;
  avatar_url?: string;
  create_at?: Date;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toUserResponse(json: string): UserResponse {
    return JSON.parse(json);
  }

  public static userResponseToJson(value: UserResponse): string {
    return JSON.stringify(value);
  }
}
