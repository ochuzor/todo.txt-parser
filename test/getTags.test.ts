import { getTokens, getTags } from '../src/text-dto.utils';

describe('getTags', () => {
    it('should return tags dates', () => {
        const tokens = getTokens('send in the report due:2010-01-02');
        const result = getTags(tokens);
        expect(result).toEqual([{ name: 'due', value: '2010-01-02' }]);
    });

    it('should handle tags at the beginning of texts', () => {
        const tokens = getTokens('id:20 add a new line to the main document');
        const result = getTags(tokens);
        expect(result).toEqual([{ name: 'id', value: '20' }]);
    });

    it('should not take spaces for tag name', () => {
        const tokens = getTokens(
            'create a separate file file name:file-02.txt'
        );
        const result = getTags(tokens);
        expect(result).toEqual([{ name: 'name', value: 'file-02.txt' }]);
    });

    it('should not take spaces for tag value', () => {
        const tokens = getTokens(
            'create a separate file file-name:file name.txt'
        );
        const result = getTags(tokens);
        expect(result).toEqual([{ name: 'file-name', value: 'file' }]);
    });

    it('should return multiple tags', () => {
        const tokens = getTokens(
            'watch a new episode of law and order episode:05 season:02'
        );
        const result = getTags(tokens);
        expect(result).toEqual([
            { name: 'episode', value: '05' },
            { name: 'season', value: '02' },
        ]);
    });

    it('should return multiple tags scattered', () => {
        const tokens = getTokens(
            'id:t1 make a search for topic:network-security for school, course:computer-networks'
        );
        const result = getTags(tokens);
        expect(result).toEqual([
            { name: 'id', value: 't1' },
            { name: 'topic', value: 'network-security' },
            { name: 'course', value: 'computer-networks' },
        ]);
    });

    it('multiple tags with same name', () => {
        const tokens = getTokens('take care of tasks id:1 id:2 id:3');
        const result = getTags(tokens);
        expect(result).toEqual([
            { name: 'id', value: '1' },
            { name: 'id', value: '2' },
            { name: 'id', value: '3' },
        ]);
    });

    it('multiple tags with same value', () => {
        const tokens = getTokens('setup test for id:101 ref:101 doc:101 @work');
        const result = getTags(tokens);
        expect(result).toEqual([
            { name: 'id', value: '101' },
            { name: 'ref', value: '101' },
            { name: 'doc', value: '101' },
        ]);
    });

    it('should handle multiple tags with same name and value', () => {
        const tokens = getTokens(
            'x @test setup test for tag:test-101 repeated tag:test-101'
        );
        const result = getTags(tokens);
        expect(result).toEqual([
            { name: 'tag', value: 'test-101' },
            { name: 'tag', value: 'test-101' },
        ]);
    });

    it('should handle an empty tag list', () => {
        const result = getTags([]);
        expect(result).toEqual([]);
    });

    it('should handle invalid tag format name:', () => {
        const tokens = getTokens(
            'file reports for: accounting, hr, others due:today'
        );
        const result = getTags(tokens);
        expect(result).toEqual([{ name: 'due', value: 'today' }]);
    });

    it('should handle invalid tag format :value', () => {
        const tokens = getTokens('get milk :shopping due:tomorrow');
        const result = getTags(tokens);
        expect(result).toEqual([{ name: 'due', value: 'tomorrow' }]);
    });
});
