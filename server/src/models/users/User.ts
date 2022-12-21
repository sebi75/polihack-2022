export type UserResultType = {
    email: string;
    about: string;
    userId: string;
    birthday: Date;
    fullName: string;
    createdAt: number;
    updatedAt: number;
    isVerified: boolean;
    profilePicture: string;
}

type ExcludedKeysUnion = "userId" | "createdAt" | "updatedAt" | "isVerified" | "profilePicture" | 'fullName' | 'about'
export type UserCreate = Omit<UserResultType, ExcludedKeysUnion> & { password: string }
