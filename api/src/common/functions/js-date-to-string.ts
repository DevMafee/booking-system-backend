interface IjsDateToString {
  date: Date;
  separator?: string;
}
export function jsDateToString(
  {date, separator = '-'}: IjsDateToString
): string{
  const day = String(date.getDate()).padStart(2,"0");
  const month = String(date.getMonth()+1).padStart(2,"0");
  const year = date.getFullYear();
  return year+separator+month+separator+day;
}