import { getProjectListString } from '../src/text-index-dto.utils';
import { getTokens } from '../src/text-dto.utils';

describe('getProjectListString', () => {
    it('getProjectListString: should get project from one word', () => {
        const tokens = getTokens('+partyPlanning');
        const result = getProjectListString(tokens);
        expect(result).toEqual('partyPlanning');
    });

    it('getProjectListString: should handle empty string', () => {
        const tokens = getTokens('');
        const result = getProjectListString(tokens);
        expect(result).toEqual('');
    });

    it('getProjectListString: should handle texts with multiple projects', () => {
        const tokens = getTokens(
            '(A) Call Mom +Family +PeaceLoveAndHappiness @iphone @phone'
        );
        const result = getProjectListString(tokens);
        expect(result).toEqual('Family, PeaceLoveAndHappiness');
    });

    it('getProjectListString: should handle texts with no project', () => {
        const tokens = getTokens('(A) Thank Mom for the meatballs @phone');
        const result = getProjectListString(tokens);
        expect(result).toEqual('');
    });

    it('getProjectListString: should handle completed todos', () => {
        const tokens = getTokens('x 2011-03-02 Document +TodoTxt task format');
        const result = getProjectListString(tokens);
        expect(result).toEqual('TodoTxt');
    });
});
