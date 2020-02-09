const priorityMarkers = ['(A)', '(B)', '(C)', '(D)', '(E)'];

export const filterByChar = (chr: string, tokens: string[]): string[] => {
    return tokens.reduce((acc, token) => {
        if (token.startsWith(chr)) {
            const val = token.replace(chr, '');
            if (val !== '') acc.push(val);
        }
        return acc;
    }, [] as string[]);
};

export const isDateFormatValid = (dateString: string): boolean => {
    // date format is 'YYYY-MM-DD'
    return /^(\d{4})-(\d{1,2})-(\d{1,2})$/.test(dateString);
};

export const isDateValueValid = (dateString: string): boolean => {
    // https://www.geeksforgeeks.org/how-to-check-a-date-is-valid-or-not-using-javascript/
    const d = new Date(dateString);
    return !Number.isNaN(d.getTime());
};

export const isDateValid = (dateString: string): boolean => {
    return isDateFormatValid(dateString) && isDateValueValid(dateString);
};

export const isPriorityMarker = (token: string): boolean => {
    return priorityMarkers.includes(token);
};

export const removeCompletionMarker = (tokens: string[]): string[] => {
    if (tokens[0] === 'x') return tokens.slice(1);

    return tokens.slice(0);
};

export const removePriorityMarker = (tokens: string[]): string[] => {
    if (priorityMarkers.includes(tokens[0])) return tokens.slice(1);

    return tokens.slice(0);
};

export const omitCompletionAndPriorityMarkers = (
    tokens: string[]
): string[] => {
    return removePriorityMarker(removeCompletionMarker(tokens));
};

/**
 * removes tokesn up to the first non-completion or creation date token
 * @param tokens token values
 */
export const omitDates = (tokens: string[]): string[] => {
    let ls = omitCompletionAndPriorityMarkers(tokens);
    // yes, twice (completionDate and creationDate)
    if (isDateValid(ls[0])) ls = ls.slice(1);
    if (isDateValid(ls[0])) ls = ls.slice(1);

    return ls;
};

export const isValidTagTokens = (tagTokens: string[]): boolean => {
    return tagTokens.length === 2 && tagTokens[0] !== '' && tagTokens[1] !== '';
};

export const isProjectString = (token: string): boolean =>
    token.startsWith('+');
export const isContextString = (token: string): boolean =>
    token.startsWith('@');
