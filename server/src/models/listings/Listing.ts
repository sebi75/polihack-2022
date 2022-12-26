import { ListingApplicationTypeStatusEnum } from '../../types';

export type ListingResultType = {
  title: string; //editable
  endDate: number; //editable
  location: string;
  photoURL: string; //editable
  startDate: number; //editable
  jobOfferId: string;
  employerId: string;
  hoursPerDay: number; //editable
  description: string; //editable
  employerName: string;
  jobDurationInDays: number; //editable
};

type ExcludedKeysUnion = 'location' | 'employerName' | 'jobOfferId' | 'employerId' | 'employerName'; // we get the location by getting the profile

export type ListingCreateType = Omit<ListingResultType, ExcludedKeysUnion>;

export type ListingUpdateType = Partial<Omit<ListingResultType, ExcludedKeysUnion>>;

export type ListingApplyType = {
  listingId: string;
};

//how an application looks like
export type ListingApplicationType = {
  listingId: string;
  userId: string;
  createdAt: number;
  status: ListingApplicationTypeStatusEnum;
};
