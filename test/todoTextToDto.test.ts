import { todoTextToDto } from '../src';

describe('todoTextToDto', () => {
    it('should parse basic todo text', () => {
        const text = 'x 2011-03-03 Call Mom';
        const result = todoTextToDto(text);
        const expected = {
            text: text,
            isCompleted: true,
            priority: '',
            dateOfCreation: '2011-03-03',
            dateOfCompletion: '',
            projects: [],
            contexts: [],
            tags: [],
        };

        expect(result).toEqual(expected);
    });

    it('should handle a texts with multiple tags', () => {
        const text = '(A) FILE TAXES! due:2014-04-15 for:me for:wife';
        const result = todoTextToDto(text);
        const expected = {
            text: text,
            isCompleted: false,
            priority: '(A)',
            dateOfCreation: '',
            dateOfCompletion: '',
            projects: [],
            contexts: [],
            tags: [
                { name: 'due', value: '2014-04-15' },
                { name: 'for', value: 'me' },
                { name: 'for', value: 'wife' },
            ],
        };

        expect(result).toEqual(expected);
    });

    it('should handle empty text string', () => {
        const text = '';
        const result = todoTextToDto(text);
        const expected = {
            text: text,
            isCompleted: false,
            priority: '',
            dateOfCreation: '',
            dateOfCompletion: '',
            projects: [],
            contexts: [],
            tags: [],
        };

        expect(result).toEqual(expected);
    });
});
