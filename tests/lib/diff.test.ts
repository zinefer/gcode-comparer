import { diff } from '../../src/lib/diff';

describe('diff', () => {
    it('should return an empty array when both strings are empty', () => {
        expect(diff('', '')).toEqual([]);
    });

    it('should return an array of unchanged edits when both strings are the same', () => {
        expect(diff('abc', 'abc')).toEqual([
            { type: 'unchanged', value: 'a' },
            { type: 'unchanged', value: 'b' },
            { type: 'unchanged', value: 'c' },
        ]);
    });

    it('should return an array of remove and add edits when strings are different', () => {
        expect(diff('abc', 'def')).toEqual([
            { type: 'remove', value: 'a' },
            { type: 'remove', value: 'b' },
            { type: 'remove', value: 'c' },
            { type: 'add', value: 'd' },
            { type: 'add', value: 'e' },
            { type: 'add', value: 'f' },
        ]);
    });

    it('should handle empty strings', () => {
        expect(diff('', 'abc')).toEqual([
            { type: 'add', value: 'a' },
            { type: 'add', value: 'b' },
            { type: 'add', value: 'c' },
        ]);

        expect(diff('abc', '')).toEqual([
            { type: 'remove', value: 'a' },
            { type: 'remove', value: 'b' },
            { type: 'remove', value: 'c' },
        ]);
    });

    it('should handle complex cases', () => {
        expect(diff('abcde', 'aXcYde')).toEqual([
            { type: 'unchanged', value: 'a' },
            { type: 'remove', value: 'b' },
            { type: 'unchanged', value: 'c' },
            { type: 'add', value: 'X' },
            { type: 'unchanged', value: 'd' },
            { type: 'add', value: 'Y' },
            { type: 'unchanged', value: 'e' },
        ]);

        expect(diff('abcde', 'aXbYcZde')).toEqual([
            { type: 'unchanged', value: 'a' },
            { type: 'add', value: 'X' },
            { type: 'unchanged', value: 'b' },
            { type: 'add', value: 'Y' },
            { type: 'unchanged', value: 'c' },
            { type: 'add', value: 'Z' },
            { type: 'unchanged', value: 'd' },
            { type: 'unchanged', value: 'e' },
        ]);
    });
});
