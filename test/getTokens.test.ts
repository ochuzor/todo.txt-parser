import { getTokens } from '../src';

describe('getTokens', () => {
    it('getTokens: returns an array of string', () => {
        expect(getTokens('call mom')).toEqual(['call', 'mom']);
    });

    it('getTokens: empty string returns an empty array', () => {
        expect(getTokens('')).toEqual([]);
    });

    it('getTokens: multiple empty spaces returns not empty string token', () => {
        expect(getTokens('call   \n   mom')).toEqual(['call', 'mom']);
    });

    it('getTokens: priority marker should be separated with space', () => {
        expect(getTokens('(B)->Submit TPS report')).toEqual(['(B)->Submit', 'TPS', 'report']);
    });
});
