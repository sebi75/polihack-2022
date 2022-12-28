export type EmployerResultType = {
  userId: string;
  email: string;
  hashedPassword: string;
  role: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;

  employerProfile: {
    name: string;
    about: string; // editable
    rating: number;
    location: string;
    state: string;
    city: string;
    profilePicture: string; // editable
    activityDomain: string;
  };
};

type ExcludedKeysUnion =
  | 'userId'
  | 'createdAt'
  | 'updatedAt'
  | 'hashedPassword'
  | 'isVerified'
  | 'about'
  | 'employerProfile'
  | 'role';

export type EmployerCreate = Omit<EmployerResultType, ExcludedKeysUnion> & {
  city: string;
  name: string;
  state: string;
  password: string;
  activityDomain: string;
};

export type EmployerUpdate = Partial<
  Omit<EmployerResultType, ExcludedKeysUnion | 'email'> & {
    profilePicture?: string;
    about?: string;
  }
>;
