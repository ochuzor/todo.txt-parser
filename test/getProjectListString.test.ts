import { getProjectListString } from '../src/text-index-dto.utils';
import { getTokens } from '../src/text-dto.utils';

describe('getProjectListString', () => {
    it('should get project from one word', () => {
        const tokens = getTokens('+partyPlanning');
        const result = getProjectListString(tokens);
        expect(result).toEqual('partyPlanning');
    });

    it('handle empty string', () => {
        const tokens = getTokens('');
        const result = getProjectListString(tokens);
        expect(result).toEqual('');
    });
});
