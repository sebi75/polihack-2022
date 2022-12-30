// import { getDocs, query, where, collection } from 'firebase/firestore';
// import { Collections, ErrorMessages } from '../types';
// import { db } from '../../config';

// import { IJobOfferModel } from '../../archive/models/JobOfferModel';

// export const getAllJobOffers = async (): Promise<Array<IJobOfferModel>> => {
// 	const jobOffersCollectionReference = collection(db, Collections.jobOffers);

// 	try {
// 		const docs = await getDocs(jobOffersCollectionReference);
// 		const jobOffers: IJobOfferModel[] = [];
// 		docs.forEach((doc) => {
// 			console.log({ document: doc.data() });
// 			jobOffers.push(doc.data() as IJobOfferModel);
// 		});
// 		return jobOffers;
// 	} catch (error) {
// 		console.log('GOT HER EIN ERROR');
// 		console.log(error);
// 		throw Error(ErrorMessages.getAllJobOffers);
// 	}
// };
