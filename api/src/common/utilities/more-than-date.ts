import { LessThanOrEqual, MoreThan, MoreThanOrEqual } from "typeorm";
import { format } from 'date-fns'

export const OnlyTodayDate = () => format(new Date(), 'yyyy-mm-dd');

export const MoreThanOrEqualTodayDate = () => {
  return MoreThanOrEqual(format(new Date(new Date().toISOString().slice(0, 10)), 'yyyy-M-dd'));
}

export const LessThanOrEqualTodayDate = () => {
  return LessThanOrEqual(format(new Date(new Date().toISOString().slice(0, 10)), 'yyyy-M-dd'));
}

export const LessThanOrEqual30DaysMinusTodayDate = () => {
  const dateNow = new Date();
  dateNow.setDate(dateNow.getDate() - 30);
  return LessThanOrEqual(format(new Date(dateNow.toISOString().slice(0, 10)), 'yyyy-M-dd'));
}

export const MoreThanTodayDate = () => {  
  return MoreThan(format(new Date(new Date().toISOString().slice(0, 10)), 'yyyy-M-dd'));
}

export const MoreThanDate = (date: Date) => MoreThan(format(date, 'yyyy-mm-dd'));