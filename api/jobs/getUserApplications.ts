import { getDocs, query, where, doc, collection } from "firebase/firestore";
import { Collections } from "../../types";

import { db } from "../../config";
import { IJobApplicationModel } from "../models/JobApplicationModel";

export const getUserApplications = async (
  userId: string
): Promise<Array<IJobApplicationModel>> => {
  const jobsApplicationsReference = collection(db, Collections.jobApplications);

  const q = query(jobsApplicationsReference, where("userId", "==", userId));
  try {
    const docs = await getDocs(q);
    const applications: Array<IJobApplicationModel> = [];
    docs.forEach((doc) => {
      applications.push(doc.data() as IJobApplicationModel);
    });

    return applications;
  } catch (error) {
    throw Error("Error getting the documents for applications");
  }
};
