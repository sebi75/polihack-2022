export type UserResultType = {
  userId: string;
  email: string;
  hashedPassword: string;
  role: string;
  isVerified: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;

  userProfile: {
    about: string; //editable
    birthday: string;
    firstName: string; //editable
    lastName: string; // editable
    profilePicture: string; // editable
  };
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
