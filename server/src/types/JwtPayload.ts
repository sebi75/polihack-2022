export type JwtPayload = {
  email: string;
  userId: string;
  role: string;
  employerId?: string;
};
