const isNullOrUndefined = <T>(value: T | null | undefined): value is null | undefined =>
    value === undefined || value === null;

const isStringNullOrEmpty = (value: string | null | undefined): boolean =>
    isNullOrUndefined<string>(value) || (value as string).trim().length === 0;

const isEmptyArray = <T>(value: T[]): boolean => isNullOrUndefined<T[]>(value) || value.length === 0;

const isValidJson = (value: string | null): boolean => {
  if (value === null) return false;

  try {
    JSON.parse(value);
  } catch {
    return false;
  }
  return true;
};

const isValidEmail = (email: string): boolean => {
  const pattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}

const formatDateIso = (date: Date): string => {
  return date.toISOString();
}

const parseDateLocal = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const getTomorrowDate = (): Date => {
  const today: Date = new Date();
  const year: number = today.getFullYear();
  const month: number = today.getMonth();
  const tomorrowDay: number = today.getDate() + 1;
  const tomorrow = new Date(year, month, tomorrowDay);

  return tomorrow;
};

const formatDateForInput = (date: Date): string => {
  const selectedDate: Date = date;

  const year = selectedDate.getFullYear();
  const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
  const day = String(selectedDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export { isStringNullOrEmpty, isNullOrUndefined, isEmptyArray, isValidJson, isValidEmail, formatDateIso, parseDateLocal, getTomorrowDate, formatDateForInput };
