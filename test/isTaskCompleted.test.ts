import { isTaskCompleted } from '../src';

describe('isTaskCompleted', () => {
    it('isTaskCompleted: should return true with "x"', () => {
        const tokens = ['x'];
        expect(isTaskCompleted(tokens)).toEqual(true);
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
    
    it('isTaskCompleted: should return false with \'(A) text tom\'', () => {
        const tokens = ['(A)', 'text', 'tom'];
        expect(isTaskCompleted(tokens)).toBe(false);
    });

    it('isTaskCompleted: should return false with x NOT in the beginning of token', () => {
        const tokens = ['find', 'x'];
        expect(isTaskCompleted(tokens)).toBe(false);
    });
});
