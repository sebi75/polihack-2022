export type UserResultType = {
  email: string;
  about: string; //editable
  userId: string;
  birthday: string;
  firstName: string; //editable
  lastName: string; // editable
  createdAt: number;
  updatedAt: number;
  isVerified: boolean;
  profilePicture: string; // editable
};

type ExcludedKeysUnion =
  | 'userId'
  | 'createdAt'
  | 'updatedAt'
  | 'isVerified'
  | 'profilePicture'
  | 'firstName'
  | 'lastName'
  | 'about';
export type UserCreate = Omit<UserResultType, ExcludedKeysUnion> & { password: string };

export type UserUpdate = Partial<
  Omit<UserResultType, ExcludedKeysUnion | 'birthday' | 'email'> & {
    firstName?: string;
    profilePicture?: string;
    lastName?: string;
    about?: string;
  }
>;
