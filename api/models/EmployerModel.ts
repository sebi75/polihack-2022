export interface IEmployerModel {
  name: string;
  about: string;
  email: string;
  rating: number;
  location: string;
  createdAt: number;
  updatedAt: number;
  companyId: string;
  isVerified: boolean;
  profilePicture: string;
  activityDomain: string; // we may want an enum that enumerates more already known fields of the employer
  //todo complete with fields we need to know
}
