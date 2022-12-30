// import { getDocs, where, query, collection } from 'firebase/firestore';
// import { Collections, ErrorMessages } from '../types';

// import { db } from '../../config';
// import { IJobApplicationModel } from '../../archive/models/JobApplicationModel';

// export const getEmployerApplicationsByJobOfferId = async (
// 	jobOfferId: string
// ): Promise<Array<IJobApplicationModel>> => {
// 	const jobApplicationsReference = collection(db, Collections.jobApplications);

// 	const q = query(
// 		jobApplicationsReference,
// 		where('jobOfferId', '==', jobOfferId)
// 	);

// 	try {
// 		const docs = await getDocs(q);
// 		const applications: Array<IJobApplicationModel> = [];
// 		docs.forEach((doc) => {
// 			applications.push(doc.data() as IJobApplicationModel);
// 		});

// 		return applications;
// 	} catch (error) {
// 		throw Error(ErrorMessages.getEmployerApplicationsByJobOfferId);
// 	}
// };
