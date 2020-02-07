import { isTaskCompleted } from '../src';

describe('isTaskCompleted', () => {
    it('isTaskCompleted: should return true with "x"', () => {
        const tokens = ['x'];
        expect(isTaskCompleted(tokens)).toBe(true);
    });

    it('isTaskCompleted: should return true with "x"', () => {
        const tokens = ['x', 'prepare', 'for', 'test'];
        expect(isTaskCompleted(tokens)).toBe(true);
    });

    it('isTaskCompleted: should return false with capital X', () => {
        const tokens = ['X'];
        expect(isTaskCompleted(tokens)).toEqual(false);
    });

    it('isTaskCompleted: should return false with no x', () => {
        const tokens = ['call', 'mom'];
        expect(isTaskCompleted(tokens)).toBe(false);
    });

    it('isTaskCompleted: should return false with xylophone', () => {
        const tokens = ['xylophone', 'lesson'];
        expect(isTaskCompleted(tokens)).toBe(false);
    });

    it("isTaskCompleted: should return false with '(A) text tom'", () => {
        const tokens = ['(A)', 'text', 'tom'];
        expect(isTaskCompleted(tokens)).toBe(false);
    });

    it('isTaskCompleted: should return false with x NOT in the beginning of token', () => {
        const tokens = ['find', 'x'];
        expect(isTaskCompleted(tokens)).toBe(false);
    });

    it('isTaskCompleted: should return false with an empty token list', () => {
        const tokens: string[] = [];
        expect(isTaskCompleted(tokens)).toBeFalsy();
    });

    it('isTaskCompleted: task is not completed if preceded by priority marker', () => {
        const tokens: string[] = ['(A)', 'x', 'Find', 'ticket', 'prices'];
        expect(isTaskCompleted(tokens)).toBeFalsy();
    });

    it('isTaskCompleted: completed marker in brackets is invalid', () => {
        const tokens: string[] = ['(x)', 'concert', 'tickets', 'online'];
        expect(isTaskCompleted(tokens)).toBeFalsy();
    });
});
