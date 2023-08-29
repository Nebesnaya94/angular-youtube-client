import { FormControl, ValidationErrors } from '@angular/forms';

export const dateValidator = (
  control: FormControl
): ValidationErrors | null => {
  const currentDate = new Date();
  const inputDate = new Date(control.value);

  if (inputDate > currentDate) {
    return { futureDate: true };
  }

  return null;
};
