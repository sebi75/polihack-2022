import { collection, where, query, getDocs } from 'firebase/firestore';

import { IJobOfferModel } from '../models/JobOfferModel';
import { db } from '../../config';
import { Collections, ErrorMessages } from '../../types';

export const getJobsOffersByEmployerId = async (
	employerId: string
): Promise<Array<IJobOfferModel>> => {
	const jobOffersReference = collection(db, Collections.jobOffers);

	const q = query(jobOffersReference, where('employerId', '==', employerId));

	try {
		const docs = await getDocs(q);
		const jobOffers: Array<IJobOfferModel> = [];
		docs.forEach((doc) => {
			jobOffers.push(doc.data() as IJobOfferModel);
		});

		return jobOffers;
	} catch (error) {
		throw Error(ErrorMessages.getJobsOffersByEmployerId);
	}
};
