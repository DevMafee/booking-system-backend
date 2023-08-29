interface IjsDateAdd {
  days: number;
  date?: string;
}
export function jsDateAdd(
  { days, date }: IjsDateAdd
): Date{
  let newDate = new Date;
  if(date){
    newDate = new Date(date);
  }
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}