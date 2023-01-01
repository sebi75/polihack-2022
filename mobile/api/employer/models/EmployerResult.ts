export type EmployerResultType = {
	userId: string;
	email: string;
	role: string;
	isVerified: boolean;
	createdAt: Date;
	updatedAt: Date;

	employerProfile: EmployerProfile;
};

export type EmployerProfile = {
	userId: string;
	employerId: string;

	name: string;
	about: string;
	rating: number | null;
	location: string;
	state: string;
	city: string;
	profilePicture: string;
	activityDomain: string;
};
