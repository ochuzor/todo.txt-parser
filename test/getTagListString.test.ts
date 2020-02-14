import { getTagListString } from '../src/text-index-dto.utils';
import { getTokens } from '../src/text-dto.utils';

describe('getTagListString', () => {
    it('should return correct string', () => {
        const tokens = getTokens('send in the report due:2010-01-02');
        const result = getTagListString(tokens);
        expect(result).toEqual('due:2010-01-02');
    });

    it('should handle multiple tags', () => {
        const tokens = getTokens(
            'watch a new episode of law and order episode:05 season:02'
        );
        const result = getTagListString(tokens);
        expect(result).toEqual('episode:05 season:02');
    });

    it('should handle multiple tags scattered', () => {
        const tokens = getTokens(
            'id:t1 make a search for topic:network-security for school, course:computer-networks'
        );
        const result = getTagListString(tokens);
        expect(result).toEqual(
            'id:t1 topic:network-security course:computer-networks'
        );
    });

    it('should handle tags at the beginning of texts', () => {
        const tokens = getTokens('id:20 add a new line to the main document');
        const result = getTagListString(tokens);
        expect(result).toEqual('id:20');
    });

    it('should not take spaces for tag name', () => {
        const tokens = getTokens(
            'create a separate file file name:file-02.txt'
        );
        const result = getTagListString(tokens);
        expect(result).toEqual('name:file-02.txt');
    });

    it('should handle spaces for tag value', () => {
        const tokens = getTokens(
            'create a separate file file-name:file name.txt'
        );
        const result = getTagListString(tokens);
        expect(result).toEqual('file-name:file');
    });

    it('multiple tags with same name', () => {
        const tokens = getTokens('take care of tasks id:1 id:2 id:3');
        const result = getTagListString(tokens);
        expect(result).toEqual('id:1 id:2 id:3');
    });

    it('multiple tags with same value', () => {
        const tokens = getTokens('setup test for id:101 ref:101 doc:101 @work');
        const result = getTagListString(tokens);
        expect(result).toEqual('id:101 ref:101 doc:101');
    });

    it('should handle multiple tags with same name and value', () => {
        const tokens = getTokens(
            'x @test setup test for tag:test-101 repeated tag:test-101'
        );
        const result = getTagListString(tokens);
        expect(result).toEqual('tag:test-101 tag:test-101');
    });

    it('should handle an empty tag list', () => {
        const result = getTagListString([]);
        expect(result).toEqual('');
    });

    it('should handle invalid tag format name:', () => {
        const tokens = getTokens(
            'file reports for: accounting, hr, others due:today'
        );
        const result = getTagListString(tokens);
        expect(result).toEqual('due:today');
    });

    it('should handle invalid tag format :value', () => {
        const tokens = getTokens('get milk :shopping due:tomorrow');
        const result = getTagListString(tokens);
        expect(result).toEqual('due:tomorrow');
    });
});
