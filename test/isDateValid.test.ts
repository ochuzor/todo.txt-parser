import { isDateValid } from '../src';

describe('isDateValid', () => {
    it('2020-02-06 is a valid date', () => {
        expect(isDateValid('2020-02-06')).toBeTruthy();
    });

    it('2020/02/06 is invalid date value (value is valid, format is not)', () => {
        expect(isDateValid('2020/02/06')).toBeFalsy();
    });

    it('2020-20-06 is a valid date (invalid month value)', () => {
        expect(isDateValid('2020-20-06')).toBeFalsy();
    });

    it('date string with alphabet in DAY is NOT a valid date', () => {
        expect(isDateValid('2020-20-0a')).toBeFalsy();
    });

    it('date string with alphabet in MONTH is NOT a valid date', () => {
        expect(isDateValid('2020-ab-01')).toBeFalsy();
    });

    it('YEAR is NOT valid', () => {
        expect(isDateValid('20-06-01')).toBeFalsy();
    });

    it('isValidDate: handle empty string', () => {
        expect(isDateValid('')).toBeFalsy();
    });

    it('isValidDate: should handle correct date value but invalid string format', () => {
        expect(isDateValid('06-11-1999')).toBeFalsy();
    });
});
