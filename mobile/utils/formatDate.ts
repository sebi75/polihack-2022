export const formatDateFromDatenow = (date: number) => {
	//format date from the number to format: 11 December
	const dateObj = new Date(date);
	const month = dateObj.toLocaleString('default', { month: 'long' });
	const day = dateObj.getDate();
	return `${day} ${month}`;
};

export const formatSignupUserDate = (date: Date): string => {
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const year = date.getFullYear();

	return `${month}-${day}-${year}`;
};
