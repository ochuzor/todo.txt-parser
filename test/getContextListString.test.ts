import { getTokens } from '../src/text-dto.utils';
import { getContextListString } from '../src/text-index-dto.utils';

describe('getContextListString', () => {
    it('should handle just a single word', () => {
        const tokens = getTokens('@computer');
        const result = getContextListString(tokens);
        expect(result).toEqual('computer');
    });

    it('getContexts: handle empty string', () => {
        const tokens = getTokens('');
        const result = getContextListString(tokens);
        expect(result).toEqual('');
    });

    it('getContexts: just the @ sign', () => {
        const tokens = getTokens('@');
        const result = getContextListString(tokens);
        expect(result).toEqual('');
    });

    it('getContexts: the @ sign and a space', () => {
        const tokens = getTokens('@ home');
        const result = getContextListString(tokens);
        expect(result).toEqual('');
    });

    // @todo add more tests...
});