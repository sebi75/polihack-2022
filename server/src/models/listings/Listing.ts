import { ListingApplicationTypeStatusEnum } from '../../types';

export enum ListingActiveStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PAUSED = 'PAUSED',
}

export type ListingResultType = {
  title: string; //editable
  endDate: string; //editable format: MM-DD-YYYY
  startDate: string; //editable format: MM-DD-YYYY
  location: string;
  photoURL: string; //editable
  activeStatus: ListingActiveStatusEnum;
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
