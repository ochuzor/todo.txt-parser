import { getPriority } from '../src';

describe('getPriority', () => {
    it('getPriority: returns correct priority', () => {
        const tokens = ['(A)', 'text', 'tom'];
        expect(getPriority(tokens)).toEqual('(A)');
    });

    it('getPriority: should return an empty priority with not priority marker', () => {
        const tokens = ['x', 'check', 'the', 'message'];
        expect(getPriority(tokens)).toEqual('');
    });

    it('getPriority: should return an empty priority with invalid priority marker placement position', () => {
        const tokens = ['Really', 'gotta', 'call', 'Mom', '(A)', '@phone', '@someday'];
        expect(getPriority(tokens)).toEqual('');
    });

    it('getPriority: should return correct property with completed tasks', () => {
        const tokens = ['x', '(C)', 'check', 'home', 'work'];
        expect(getPriority(tokens)).toEqual('(C)');
    });

    it('getPriority: should return empty priority marker with non-first marker not preceded by completed marker', () => {
        const tokens = ['task', '(C)', 'is', 'home', 'work'];
        expect(getPriority(tokens)).toEqual('');
    });

    it('getPriority: should return first non-empty priority', () => {
        const tokens = ['(A)', '(C)', 'is', 'home', 'work'];
        expect(getPriority(tokens)).toEqual('(A)');
    });

    it('getPriority: lower case priority is invalid', () => {
        const tokens = ['(a)', 'text', 'tom'];
        expect(getPriority(tokens)).toEqual('');
    });
});
