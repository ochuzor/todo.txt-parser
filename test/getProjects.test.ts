import { getTokens, getProjects } from '../src/text-dto.utils';

describe('getProjects', () => {
    it('getProjects: just one word', () => {
        const tokens = getTokens('+partyPlanning');
        expect(getProjects(tokens)).toEqual(['partyPlanning']);
    });

    it('getProjects: handle empty string', () => {
        const tokens = getTokens('');
        expect(getProjects(tokens)).toEqual([]);
    });

    it('getProjects: just a plus sign', () => {
        const tokens = getTokens('+');
        expect(getProjects(tokens)).toEqual([]);
    });

    it('getProjects: a plus sign and a space', () => {
        const tokens = getTokens('+ exam');
        expect(getProjects(tokens)).toEqual([]);
    });

    it('getProjects: handle long string with no + sign', () => {
        const tokens = getTokens('(A) Thank Mom for the meatballs @phone');
        expect(getProjects(tokens)).toEqual([]);
    });

    it('getProjects: handle long string with one project', () => {
        const tokens = getTokens(
            'Post signs around the neighborhood +GarageSale'
        );
        expect(getProjects(tokens)).toEqual(['GarageSale']);
    });

    it('getProjects: handle long string with no + sign but with a context', () => {
        const tokens = getTokens(
            '(B) Schedule Goodwill pickup +GarageSale @phone'
        );
        expect(getProjects(tokens)).toEqual(['GarageSale']);
    });

    it('getProjects: handle multiple projects', () => {
        const tokens = getTokens(
            '(A) Call Mom +Family +PeaceLoveAndHappiness @iphone @phone'
        );
        expect(getProjects(tokens)).toEqual([
            'Family',
            'PeaceLoveAndHappiness',
        ]);
    });

    it('getProjects: handle aritmetic contents', () => {
        const tokens = getTokens('Learn how to add 2+2');
        expect(getProjects(tokens)).toEqual([]);
    });

    it('getProjects: handle completed tasks', () => {
        const tokens = getTokens(
            "x 2011-03-02 2011-03-01 Review Tim's pull request +TodoTxtTouch @github"
        );
        expect(getProjects(tokens)).toEqual(['TodoTxtTouch']);
    });
});
