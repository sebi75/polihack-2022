import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config";
import { Collections, ErrorMessages } from "../../types";

export const isUserAlreadyApplied = async (
  userId: string,
  jobOfferId: string
) => {
  const collectionReference = collection(db, Collections.jobApplications);
  const q = query(
    collectionReference,
    where("userId", "==", userId),
    where("jobOfferId", "==", jobOfferId)
  );
  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    throw new Error(ErrorMessages.isAlreadyApplied);
  }
};
