import { getTokens, getContexts } from '../src/text-dto.utils';

describe('getContexts', () => {
    it('getContexts: just one word', () => {
        const tokens = getTokens('@computer');
        expect(getContexts(tokens)).toEqual(['computer']);
    });

    it('getContexts: handle empty string', () => {
        const tokens = getTokens('');
        expect(getContexts(tokens)).toEqual([]);
    });

    it('getContexts: just the @ sign', () => {
        const tokens = getTokens('@');
        expect(getContexts(tokens)).toEqual([]);
    });

    it('getContexts: the @ sign and a space', () => {
        const tokens = getTokens('@ home');
        expect(getContexts(tokens)).toEqual([]);
    });

    it('getContexts: handle long string with no @ sign', () => {
        const tokens = getTokens('(A) Thank Mom for the meatballs +thankful');
        expect(getContexts(tokens)).toEqual([]);
    });

    it('getProjects: handle long string with one context', () => {
        const tokens = getTokens('Post signs around the neighborhood @home');
        expect(getContexts(tokens)).toEqual(['home']);
    });

    it('getProjects: handle long string with one project and one context', () => {
        const tokens = getTokens(
            '(B) Schedule Goodwill pickup +GarageSale @phone'
        );
        expect(getContexts(tokens)).toEqual(['phone']);
    });

    it('getProjects: handle multiple contexts', () => {
        const tokens = getTokens(
            '(A) Call Mom +Family +PeaceLoveAndHappiness @iphone @phone'
        );
        expect(getContexts(tokens)).toEqual(['iphone', 'phone']);
    });

    it('getProjects: handle random in-between @ sign', () => {
        const tokens = getTokens('give a talk about l@v');
        expect(getContexts(tokens)).toEqual([]);
    });

    it('getProjects: handle email addresses', () => {
        const tokens = getTokens('send a message to my@email.com');
        expect(getContexts(tokens)).toEqual([]);
    });

    it('getProjects: handle completed tasks', () => {
        const tokens = getTokens(
            "x 2011-03-02 2011-03-01 Review Tim's pull request +TodoTxtTouch @github"
        );
        expect(getContexts(tokens)).toEqual(['github']);
    });
});
