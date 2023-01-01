export type UserResultType = {
  userId: string;
  email: string;
  hashedPassword: string;
  role: string;
  isVerified: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;

  profile: UserProfile | EmployerProfile;
};

export type UserProfile = {
  userId: string;

  firstName: string;
  lastName: string;
  profilePicture: string;
  rating: number | null;
  birthday: string;
  location: string;
  about: string;
};

export type EmployerProfile = {
  userId: string;
  employerId: string;

  name: string;
  about: string;
  rating: number | null;
  location: string;
  state: string;
  city: string;
  profilePicture: string;
  activityDomain: string;
};

type ExcludedKeysUnion =
  | 'userId'
  | 'createdAt'
  | 'updatedAt'
  | 'isVerified'
  | 'profilePicture'
  | 'hashedPassword'
  | 'firstName'
  | 'role'
  | 'lastName'
  | 'about';
export type UserCreate = Omit<UserResultType, ExcludedKeysUnion> & {
  password: string;
  birthday: string;
};

export type UserUpdate = Partial<
  Omit<UserResultType, ExcludedKeysUnion | 'birthday' | 'email' | 'userProfile'> & {
    firstName?: string;
    profilePicture?: string;
    lastName?: string;
    about?: string;
  }
>;
