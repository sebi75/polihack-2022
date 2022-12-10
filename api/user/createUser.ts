import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config";

import { IUserModel } from "../models/UserModel";
import { Collections } from "../../types/collections";

import { guid } from "../../utils";
import { ErrorMessages } from "../../types/";

export const createUser = async (user: IUserModel): Promise<IUserModel> => {
  //we want to generate random id for user when creating and naming the document as so
  const userId = guid();
  const docRef = doc(db, Collections.users, userId);

  try {
    await setDoc(docRef, user);
    return user;
  } catch (error) {
    throw Error(ErrorMessages.create_user);
  }
};
