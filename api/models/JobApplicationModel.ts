export interface IJobApplicationModel {
  jobApplicationId: string;
  userId: string;
  jobOfferId: string;
  status: JobApplicationStatusEnum;
  updatedAt: number;
  createdAt: number;
}

export enum JobApplicationStatusEnum {
  pending = "pending",
  accepted = "accepted",
  rejected = "rejected",
}
