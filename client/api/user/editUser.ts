import { doc, collection, getDoc, addDoc, setDoc } from "firebase/firestore";
import { IUserModel } from "../models";
import { db } from "../../config";
import { Collections, ErrorMessages } from "../../types";

import { setUserToAsyncStorage } from "../../utils/asyncStorage";

export const editUser = async (
  userFields: Partial<IUserModel>,
  userId: string
): Promise<IUserModel | null> => {
  //first get the old user document
  const userDocumentReference = doc(collection(db, Collections.users), userId);

  console.log({ userFields });

  try {
    const response = await getDoc(userDocumentReference);
    const user = response.data() as IUserModel;

    console.log({ currentUser: user });

    const newUser = {
      ...user,
      ...userFields,
    };

    console.log({ newUser });

    //set the new user in the database
    await setDoc(userDocumentReference, newUser);

    //set the new user in the async storage to maintain fresh data
    await setUserToAsyncStorage(newUser);
    return newUser;
  } catch (error) {
    throw Error(ErrorMessages.editUser);
  }
};
