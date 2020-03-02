import { getTokens } from '../src/text-dto.utils';
import { getContextListString } from '../src/text-index-dto.utils';

describe('getContextListString', () => {
    it('should handle just a single word', () => {
        const tokens = getTokens('@computer');
        const result = getContextListString(tokens);
        expect(result).toEqual('computer');
    });

    it('getContextListString: handle empty string', () => {
        const tokens = getTokens('');
        const result = getContextListString(tokens);
        expect(result).toEqual('');
    });

    it('getContextListString: just the @ sign', () => {
        const tokens = getTokens('@');
        const result = getContextListString(tokens);
        expect(result).toEqual('');
    });

    it('getContextListString: the @ sign and a space', () => {
        const tokens = getTokens('@ home');
        const result = getContextListString(tokens);
        expect(result).toEqual('');
    });

    it('getContextListString: should handle multiple contexts', () => {
        const tokens = getTokens('Really gotta call Mom (A) @phone @someday');
        const result = getContextListString(tokens);
        expect(result).toEqual('phone, someday');
    });

    it('getContextListString: should handle texts with projects', () => {
        const tokens = getTokens(
            '(A) Call Mom +Family +PeaceLoveAndHappiness @iphone @phone'
        );
        const result = getContextListString(tokens);
        expect(result).toEqual('iphone, phone');
    });

    it('getContextListString: should handle texts with no contexts', () => {
        const tokens = getTokens('2011-03-02 Document +TodoTxt task format');
        const result = getContextListString(tokens);
        expect(result).toEqual('');
    });
});
