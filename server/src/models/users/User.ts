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
  city: string;
  county: string;
  profilePicture: string;
  rating: number | null;
  birthday: string;
  about: string;
};

export type EmployerProfile = {
  userId: string;
  employerId: string;

  companyName: string;
  streetNumber: number;
  streetName: string;
  county: string;
  about: string;
  rating: number | null;
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
  | 'about'
  | 'active'
  | 'profile';
export type UserCreate = Omit<UserResultType, ExcludedKeysUnion> & {
  password: string;
  birthday: string;
};

export type UserUpdate = Partial<
  Omit<UserResultType, ExcludedKeysUnion | 'birthday' | 'email'> & {
    firstName?: string;
    profilePicture?: string;
    city?: string;
    county?: string;
    lastName?: string;
    about?: string;
  }
>;
