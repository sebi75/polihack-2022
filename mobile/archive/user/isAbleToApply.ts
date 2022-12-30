// import { doc, getDoc, collection } from "firebase/firestore";
// import { db } from "../../config/firebaseConfig";
// import { Collections, ErrorMessages } from "../../types";
// import { IUserModel } from "../models";

// export const isUserAbleToApply = async (userId: string): Promise<boolean> => {
//   const userDocumentReference = doc(collection(db, Collections.users), userId);

//   try {
//     const userDocument = await getDoc(userDocumentReference);
//     const userData = userDocument.data() as IUserModel;

//     if (userData) {
//       const isAbleToApply =
//         userData.fullName != null &&
//         userData.fullName != "" &&
//         userData.about != null &&
//         userData.about != "" &&
//         userData.age != null &&
//         userData.age != "";

//       return isAbleToApply;
//     }
//   } catch (error) {
//     throw Error(ErrorMessages.isUserAbleToApply);
//   }

//   return false;
// };
