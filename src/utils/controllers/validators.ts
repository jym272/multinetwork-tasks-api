import { StatusType } from '@custom-types/index';

export const isValidString = (str: string, maxLength: number): boolean => {
  const regex = new RegExp(`^(?=.{1,${maxLength}}$)(?=.*\\S)`, 's');
  return regex.test(str);
};
export const isValidStatus = (status: StatusType): boolean => {
  const validStatuses = ['new', 'in-progress', 'done'];
  return validStatuses.includes(status);
};
export const isValidId = (id: string): boolean => {
  const idAsNumber = Number(id);
  return !(isNaN(idAsNumber) || idAsNumber < 1 || idAsNumber % 1 !== 0);
};
