// import { collection, where, query, getDocs } from 'firebase/firestore';
// import { db } from '../../config';
// import { Collections, ErrorMessages } from '../../types';
// import { IJobOfferModel } from '../models/JobOfferModel';

// export const getJobByJobOfferId = async (jobOfferId: string) => {
// 	const jobOfferReference = collection(db, Collections.jobOffers);

// 	const q = query(jobOfferReference, where('jobOfferId', '==', jobOfferId));

// 	try {
// 		const docs = await getDocs(q);
// 		let jobOffer: IJobOfferModel | undefined;

// 		docs.forEach((doc) => {
// 			const jobOfferData = doc.data();
// 			jobOffer = jobOfferData as IJobOfferModel;
// 		});

// 		return jobOffer;
// 	} catch (error) {
// 		throw Error(ErrorMessages.getJobOfferByJobOfferId_error);
// 	}
// };
