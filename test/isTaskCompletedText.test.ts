import { getTokens } from '../src/text-dto.utils';
import { isTaskCompletedText } from '../src/text-index-dto.utils';

describe('isTaskCompletedText', () => {
    it('should handle a case with true', () => {
        const tokens = getTokens('x');
        const result = isTaskCompletedText(tokens);
        expect(result).toBe('true');
    });

    it('should handle a case with true (longer)', () => {
        const tokens = getTokens('x prepare for test');
        const result = isTaskCompletedText(tokens);
        expect(result).toBe('true');
    });
});
