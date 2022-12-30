// import { query, collection, where, getDocs } from "firebase/firestore";
// import { db } from "../../config";
// import { Collections } from "../../types";
// import { IUserModel } from "../models";

// export const getUser = async (
//   email: string
// ): Promise<IUserModel | undefined> => {
//   let returnedUser: IUserModel | undefined;

//   if (!email) {
//     return; // we should always have an email
//   }

//   const usersCollectionRef = collection(db, Collections.users);
//   const q = query(usersCollectionRef, where("email", "==", email));

//   try {
//     const docs = await getDocs(q);
//     docs.forEach((doc) => {
//       const docData = doc.data();
//       returnedUser = docData as IUserModel;
//     });
//   } catch (error) {}

//   return returnedUser;
// };
