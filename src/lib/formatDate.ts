export const formatDate = (date: Date | string): string => {
  if (!date || date == "Invalid Date") return "";
  if (typeof date === "string"){
    date = new Date(date + "T00:00:00Z");
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  }
  
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  
  return `${day}/${month}/${year}`;
};
