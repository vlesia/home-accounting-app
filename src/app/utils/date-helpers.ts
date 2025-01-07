import { format } from 'date-fns';

export const getFormattedCurrentDate = (): string => {
  return format(new Date(), 'dd.MM.yyyy HH:mm:ss');
};
