export const parseLocalDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day); // cuidado que los meses van de 0-11
};
