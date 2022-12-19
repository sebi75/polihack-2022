export type ListingResultType = {
    title: string;
    endDate: number;
    location: string;
    photoURL: string;
    startDate: number;
    jobOfferId: string;
    employerId: string;
    hoursPerDay: number;
    description: string;
    employerName: string;
    jobDurationInDays: number;
  }

type ExcludedKeysUnion = 'location' | 'employerName' // we get the location by getting the profile
// of the employer at listing creation time

export type CreateListingType = Omit<ListingResultType, ExcludedKeysUnion>