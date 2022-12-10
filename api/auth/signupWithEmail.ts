import { auth } from "../../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

/* create user at signup */
import { createUser } from "../user/createUser";
import { IUserModel } from "../models";
import { ErrorMessages } from "../../types";

export const signUpWithEmail = async (
  email: string,
  password: string
): Promise<IUserModel | undefined> => {
  let returnedUser;
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const signedUpUser = userCredential.user;
      const tokenPromise = await signedUpUser.getIdTokenResult();
      const token = tokenPromise.token;

      if (!token) {
        throw Error(ErrorMessages.signup_failed);
      }

      const user: IUserModel = {
        ...defaultUserDocument,
        email: signedUpUser.email as string,
        isVerified: signedUpUser.emailVerified,
        profilePicture: "",
        userId: signedUpUser.uid,
      };

      returnedUser = await createUser(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      returnedUser = undefined;
      throw new Error(errorCode);
    });

  return returnedUser;
};

const defaultUserDocument = {
  age: null,
  fullName: null,
  about: "",
  email: "",
  isVerified: false,
  createdAt: Date.now(),
  updatedAt: Date.now(),
};
