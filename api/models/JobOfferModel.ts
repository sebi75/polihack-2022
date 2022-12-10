export interface IJobOfferModel {
  title: string;
  description: string;
  estimatedEndDate: number;
  estimatedStartDate: number;
  hoursPerDay: number;
  jobDuration: number;
  jobOfferId: string;
  companyId: string;
  employerId: string;
  location: string;
}
