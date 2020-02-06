import { isDateValid } from '../src';

describe('isDateValid', () => {
    it('2020-02-06 is a valid date', () => {
        expect(isDateValid('2020-02-06')).toEqual(true);
    });

    it('date string with alphabet in DAY is NOT a valid date', () => {
        expect(isDateValid('2020-20-0a')).toEqual(false);
    });

    it('date string with alphabet in MONTH is NOT a valid date', () => {
        expect(isDateValid('2020-ab-01')).toEqual(false);
    });
});
