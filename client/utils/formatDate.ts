export const formatDateFromDatenow = (date: number) => {
  //format date from the number to format: 11 December
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString("default", { month: "long" });
  const day = dateObj.getDate();
  return `${day} ${month}`;
};
