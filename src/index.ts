export const isValidDate = (dateString: string): boolean => {
    // date format is 'YYYY-MM-DD'
    return /^(\d{4})-(\d{1,2})-(\d{1,2})$/.test(dateString);
};

export const getTokens = (str: string): string[] => {
    return str
        .split(' ')
        .map(t => t.trim())
        .filter(t => !!t);
};

export const isTaskCompleted = (tokens: string[]): boolean => {
    return tokens[0] === 'x';
};

const priorityMarkers = ['(A)', '(B)', '(C)', '(D)', '(E)'];
export const getPriority = (tokens: string[]): string => {
    const [firstToken, secondToken] = tokens;

    if (priorityMarkers.includes(firstToken)) {
        return firstToken;
    }
    if (firstToken === 'x' && priorityMarkers.includes(secondToken)) {
        return secondToken;
    }

    return '';
};

const removeCompletionMarker = (tokens: string[]): string[] => {
    if (tokens[0] === 'x') return tokens.slice(1);

    return tokens.slice(0);
};

const removePriorityMarker = (tokens: string[]): string[] => {
    if (priorityMarkers.includes(tokens[0])) return tokens.slice(1);

    return tokens.slice(0);
};

const omitCompletionAndPriorityMarkers = (tokens: string[]): string[] => {
    return removePriorityMarker(removeCompletionMarker(tokens));
};

export const getDateOfCompletion = (tokens: string[]): string => {
    if (tokens.length < 2) return '';

    const ls = omitCompletionAndPriorityMarkers(tokens);

    if (ls.length < 2) return '';

    const [dateStr1, dateStr2] = ls;
    if (isValidDate(dateStr1) && isValidDate(dateStr2)) {
        return dateStr1;
    }

    return '';
};

export const getDateOfCreation = (tokens: string[]): string => {
    const ls = omitCompletionAndPriorityMarkers(tokens);
    if (ls.length < 1) return '';

    const [dateStr1, dateStr2 = ''] = ls;
    if (isValidDate(dateStr1)) {
        return isValidDate(dateStr2) ? dateStr2 : dateStr1;
    }

    return '';
};
