export interface IUserModel {
  about: string;
  email: string;
  createdAt: number;
  updatedAt: number;
  userId: string;
  age: number | null;
  isVerified: boolean;
  fullName: string | null;
  profilePicture: string;
}
