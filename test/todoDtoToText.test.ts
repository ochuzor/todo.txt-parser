import { todoDtoToText } from '../src';

describe('todoDtoToText', () => {
    it('todoDtoToText: should handle dto with creation date', () => {
        const dto = {
            description: 'Call Mom',
            isCompleted: true,
            priority: '',
            dateOfCreation: '2011-03-03',
            dateOfCompletion: '',
            projects: [],
            contexts: [],
            tags: [],
        };

        const result = todoDtoToText(dto);
        const expected = 'x 2011-03-03 Call Mom';

        expect(result).toBe(expected);
    });

    it('todoDtoToText: should handle dto with empty values', () => {
        const dto = {
            description: '',
            isCompleted: false,
            priority: '',
            dateOfCreation: '',
            dateOfCompletion: '',
            projects: [],
            contexts: [],
            tags: [],
        };

        const result = todoDtoToText(dto);
        const expected = '';

        expect(result).toBe(expected);
    });

    it('todoDtoToText: should handle dto with tags', () => {
        const dto = {
            description: 'file taxes',
            isCompleted: false,
            priority: '',
            dateOfCreation: '',
            dateOfCompletion: '',
            projects: [],
            contexts: [],
            tags: [{ name: 'due', value: '2014-04-15' }],
        };

        const result = todoDtoToText(dto);
        const expected = 'file taxes due:2014-04-15';

        expect(result).toBe(expected);
    });

    it('todoDtoToText: should handle dto with contexts', () => {
        const dto = {
            description: 'call Tim about the contract',
            isCompleted: false,
            priority: '',
            dateOfCreation: '',
            dateOfCompletion: '',
            projects: [],
            contexts: ['home', 'phone'],
            tags: [],
        };

        const result = todoDtoToText(dto);
        const expected = 'call Tim about the contract @home @phone';

        expect(result).toBe(expected);
    });

    it('todoDtoToText: should handle dto with projects', () => {
        const dto = {
            description: 'research alternatives to current strategy',
            isCompleted: false,
            priority: '',
            dateOfCreation: '',
            dateOfCompletion: '',
            projects: ['project', 'work'],
            contexts: [],
            tags: [],
        };

        const result = todoDtoToText(dto);
        const expected =
            'research alternatives to current strategy +project +work';

        expect(result).toBe(expected);
    });
});
