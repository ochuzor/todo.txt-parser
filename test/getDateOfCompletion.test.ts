import { getDateOfCompletion } from '../src';

describe('getDateOfCompletion', () => {
    it('getDateOfCompletion: returns empty string if no dates present', () => {
        const tokens = ['x', '(C)', 'check', 'home', 'work'];
        expect(getDateOfCompletion(tokens)).toBe('');
    });

    it('getDateOfCompletion: x call mom => no date of completion', () => {
        const tokens = ['x', 'call', 'mom'];
        expect(getDateOfCompletion(tokens)).toEqual('');
    });

    it('getDateOfCompletion: only one supplied date => no date of completion', () => {
        const tokens = ['x', '2012-2-8', 'call', 'mom'];
        expect(getDateOfCompletion(tokens)).toEqual('');
    });

    it('getDateOfCompletion: x date-1 date-2 call mom => date of completion is date-1', () => {
        const tokens = ['x', '2012-2-8', '2011-10-05', 'call', 'mom'];
        expect(getDateOfCompletion(tokens)).toEqual('2012-2-8');
    });

    it('getDateOfCompletion: x (A) call mom => no date of completion', () => {
        const tokens = ['x', '(A)', 'clean', 'up', 'the', 'appartment'];
        expect(getDateOfCompletion(tokens)).toEqual('');
    });

    it('getDateOfCompletion: (B) date call mom => no date of completion', () => {
        const tokens = ['(B)', 'set', 'up', 'the', 'meeting'];
        expect(getDateOfCompletion(tokens)).toEqual('');
    });

    it('getDateOfCompletion: (B) date-1 date-2 refactor the code => date of completion is date-1', () => {
        const tokens = [
            '(B)',
            '2002-10-09',
            '1991-02-15',
            'refactor',
            'the',
            'code',
        ];
        expect(getDateOfCompletion(tokens)).toEqual('2002-10-09');
    });

    it('getDateOfCompletion: date write more tests => no date of completion', () => {
        const tokens = ['2002-10-09', 'write', 'more', 'tests'];
        expect(getDateOfCompletion(tokens)).toBe('');
    });

    it('getDateOfCompletion:  date-1 date-2 send boss an email => date of completion is date-1', () => {
        const tokens = [
            '2011-03-03',
            '2011-03-01',
            'send',
            'boss',
            'an',
            'email',
        ];
        expect(getDateOfCompletion(tokens)).toEqual('2011-03-03');
    });

    it('getDateOfCompletion: date => no date of completion', () => {
        const tokens = ['2002-10-09'];
        expect(getDateOfCompletion(tokens)).toEqual('');
    });

    it('getDateOfCompletion: invalid completion marker, no date of completion', () => {
        const tokens = [
            'X',
            '2012-11-15',
            '2012-01-01',
            'prepare',
            'the',
            'presentation',
        ];
        expect(getDateOfCompletion(tokens)).toEqual('');
    });

    it('getDateOfCompletion: invalid priority marker, no date of completion', () => {
        const tokens = [
            '(X)',
            '2012-11-15',
            '2012-01-01',
            'prepare',
            'the',
            'presentation',
        ];
        expect(getDateOfCompletion(tokens)).toEqual('');
    });

    it('getDateOfCompletion: invalid date string, no date of completion', () => {
        const tokens = [
            'a-11-15',
            '2012-01-01',
            'prepare',
            'the',
            'presentation',
        ];
        expect(getDateOfCompletion(tokens)).toEqual('');
    });

    it('getDateOfCompletion: invalid creation date string, no date of completion', () => {
        const tokens = [
            '2012-11-15',
            'err-01-01',
            'prepare',
            'the',
            'presentation',
        ];
        expect(getDateOfCompletion(tokens)).toEqual('');
    });
});
