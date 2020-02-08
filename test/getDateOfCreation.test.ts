import { getDateOfCreation } from '../src';

describe('getDateOfCreation', () => {
    it('getDateOfCreation: 2011-03-02 Document +TodoTxt task format => creation date is 2011-03-02', () => {
        const tokens = ['2011-03-02', 'Document', '+TodoTxt', 'task', 'format'];
        expect(getDateOfCreation(tokens)).toEqual('2011-03-02');
    });

    it('getDateOfCreation: (A) 2011-03-02 go for a walk = creation date is 2011-03-02', () => {
        const tokens = ['(A)', '2011-03-02', 'go', 'for', 'a', 'walk'];
        expect(getDateOfCreation(tokens)).toEqual('2011-03-02');
    });

    it('getDateOfCreation: starts with priority marker, with date of completion', () => {
        const tokens = [
            '(D)',
            '2011-03-02',
            '2011-03-01',
            'Make',
            'arrangement',
            'for',
            'new',
            'coach',
        ];
        expect(getDateOfCreation(tokens)).toEqual('2011-03-01');
    });

    it('getDateOfCreation: x (A) 2011-03-02 go hiking = creation date is 2011-03-02', () => {
        const tokens = ['x', '(A)', '2011-03-02', 'go', 'hiking'];
        expect(getDateOfCreation(tokens)).toEqual('2011-03-02');
    });

    it('getDateOfCreation: X (A) 2011-03-02 Call Mom => no creation date; invalid competed marker', () => {
        const tokens = ['X', '(A)', '2011-03-02', 'Call', 'Mom'];
        expect(getDateOfCreation(tokens)).toEqual('');
    });

    it('getDateOfCreation: invalid completed marker', () => {
        const tokens = ['X', '(A)', '2011-03-02', '2011-02-02', 'Call', 'Mom'];
        expect(getDateOfCreation(tokens)).toEqual('');
    });

    it('getDateOfCreation: invalid date placement', () => {
        const tokens = ['(A)', 'Prepare', 'for', 'the', 'test', '2011-03-02'];
        expect(getDateOfCreation(tokens)).toEqual('');
    });

    it('getDateOfCreation: with completion marker and completion date', () => {
        const tokens = [
            'x',
            '2011-03-02',
            '2011-03-01',
            'Review',
            "Tim's",
            'pull',
            'request',
            '+TodoTxtTouch',
            '@github',
        ];
        expect(getDateOfCreation(tokens)).toEqual('2011-03-01');
    });

    it('getDateOfCreation: with compltetion marker and a creation date', () => {
        const tokens = [
            'x',
            '2011-03-02',
            'Review',
            "Tim's",
            'pull',
            'request',
            '+TodoTxtTouch',
            '@github',
        ];
        expect(getDateOfCreation(tokens)).toEqual('2011-03-02');
    });

    it('getDateOfCreation: with completion marker, priority marker and completion date', () => {
        const tokens = [
            'x',
            '(C)',
            '2011-03-02',
            '2011-03-01',
            'Review',
            "Tim's",
            'pull',
            'request',
            '+TodoTxtTouch',
            '@github',
        ];
        expect(getDateOfCreation(tokens)).toEqual('2011-03-01');
    });

    it('getDateOfCreation: starts with dates', () => {
        const tokens = [
            '2011-03-02',
            '2011-03-01',
            'Prepare',
            'for',
            'the',
            'presentation',
        ];
        expect(getDateOfCreation(tokens)).toEqual('2011-03-01');
    });

    it('getDateOfCreation: just completed marker and creation date', () => {
        const tokens = ['x', '2011-03-02'];
        expect(getDateOfCreation(tokens)).toEqual('2011-03-02');
    });

    it('getDateOfCreation: just priority marker and creation date', () => {
        const tokens = ['(E)', '2011-03-02'];
        expect(getDateOfCreation(tokens)).toEqual('2011-03-02');
    });

    it('getDateOfCreation: just creation date', () => {
        const tokens = ['2011-03-02'];
        expect(getDateOfCreation(tokens)).toEqual('2011-03-02');
    });
});
