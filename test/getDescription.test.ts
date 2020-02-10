import { getDescription } from '../src';
import {getTokens} from '../src/text-dto.utils';

describe('getDescription', () => {
    it('should return description with completion', () => {
        const text = 'x 2011-03-03 Call Mom';
        const result = getDescription(getTokens(text));
        expect(result).toBe('Call Mom');
    });

    it('should return description with priority', () => {
        const text = '(B) 2014-04-10 ride 25 miles @bicycle +stayhealthy';
        const result = getDescription(getTokens(text));
        expect(result).toBe('ride 25 miles');
    });

    it('should handle a text with a context', () => {
        const text = 'x 2014-03-02 buy milk @grocerystore';
        const result = getDescription(getTokens(text));
        expect(result).toBe('buy milk');
    });

    it('should handled a text with tags', () => {
        const text = '(A) FILE TAXES! due:2014-04-15 for:me for:wife';
        const result = getDescription(getTokens(text));
        expect(result).toBe('FILE TAXES!');
    });

    it('should handled a text with texts after projects and contexts', () => {
        const text = '(A) read a book @home and write a repot @computer';
        const result = getDescription(getTokens(text));
        expect(result).toBe('read a book and write a repot');
    });

    it('should handled a text with texts after tags', () => {
        const text = 'get document docId:101 and review errors';
        const result = getDescription(getTokens(text));
        expect(result).toBe('get document and review errors');
    });
});
