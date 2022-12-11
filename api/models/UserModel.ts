export interface IUserModel {
  email: string;
  userId: string;
  createdAt: number;
  updatedAt: number;
  age: string | null;
  isVerified: boolean;
  about: string | null;
  profilePicture: string;
  fullName: string | null;
}
