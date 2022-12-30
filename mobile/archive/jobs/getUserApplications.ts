import {
	getDocs,
	query,
	where,
	doc,
	collection,
	getDoc,
} from 'firebase/firestore';
import { Collections } from '../../types';

import { db } from '../../config';
import { IJobApplicationModel } from '../models/JobApplicationModel';
import { IJobOfferModel } from '../models/JobOfferModel';

export type GetUserApplicationsResult = IJobOfferModel & IJobApplicationModel;

export const getUserApplications = async (
	userId: string
): Promise<Array<GetUserApplicationsResult>> => {
	let finalData: Array<GetUserApplicationsResult> = [];
	console.log({ message: 'Trying with the userId:  !!!!!!!', userId });
	const jobsApplicationsReference = collection(db, Collections.jobApplications);

	const q = query(jobsApplicationsReference, where('userId', '==', userId));
	try {
		const docs = await getDocs(q);
		const applications: Array<IJobApplicationModel> = [];
		docs.forEach((doc) => {
			applications.push(doc.data() as IJobApplicationModel);
		});

		console.log({ applications });

		for (const app of applications) {
			const jobOfferReference = doc(db, Collections.jobOffers, app.jobOfferId);
			const jobOffer = await getDoc(jobOfferReference);

			console.log('ADSDVTRBRTDFRB!!!!!!', jobOffer.data());

			const jobOfferData = jobOffer.data() as IJobOfferModel;

			if (jobOfferData) {
				finalData.push({
					...jobOfferData,
					...app,
				});
			}
		}

		console.log({ finalData });
		return finalData;
	} catch (error) {
		throw Error('Error getting the documents for applications');
	}
};
