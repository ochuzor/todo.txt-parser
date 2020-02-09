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

export const removeCompletionMarker = (tokens: string[]): string[] => {
    if (tokens[0] === 'x') return tokens.slice(1);

    return tokens.slice(0);
};

export const removePriorityMarker = (tokens: string[]): string[] => {
    if (priorityMarkers.includes(tokens[0])) return tokens.slice(1);

    return tokens.slice(0);
};

export const omitCompletionAndPriorityMarkers = (tokens: string[]): string[] => {
    return removePriorityMarker(removeCompletionMarker(tokens));
};

export const isPriorityMarker = (token: string): boolean => priorityMarkers.includes(token);
