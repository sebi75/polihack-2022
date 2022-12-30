// import { setDoc, doc } from 'firebase/firestore';
// import { Collections } from '../types';
// import { db } from '../../config/firebaseConfig';
// import { IJobApplicationModel } from '../../archive/models/JobApplicationModel';

// import { ErrorMessages } from '../types/errors';

// type JobApplicationResult = IJobApplicationModel | undefined;

// export const createJobApplication = async (
// 	application: IJobApplicationModel
// ): Promise<JobApplicationResult> => {
// 	const documentReference = doc(
// 		db,
// 		Collections.jobApplications,
// 		application.jobApplicationId
// 	);

// 	try {
// 		await setDoc(documentReference, application);
// 		return application;
// 	} catch (error) {
// 		throw Error(ErrorMessages.create_application_error);
// 	}
// };
