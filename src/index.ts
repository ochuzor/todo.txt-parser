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
    if (priorityMarkers.includes(firstToken)) return firstToken;
    else if (firstToken === 'x' && priorityMarkers.includes(secondToken)) {
        return secondToken;
    } else return '';
};

export const getDateOfCompletion = (tokens: string[]): string => {
    if (tokens.length < 2) return '';

    let ls: string[] = [];
    if (tokens[0] === 'x' && priorityMarkers.includes(tokens[1])) {
        ls = tokens.slice(2);
    } else if (tokens[0] === 'x' || priorityMarkers.includes(tokens[0])) {
        ls = tokens.slice(1);
    } else {
        ls = tokens.slice(0);
    }

    if (ls.length < 2) return '';

    const [dateStr1, dateStr2] = ls;
    if (isValidDate(dateStr1) && isValidDate(dateStr2)) {
        return dateStr1;
    }

    return '';
};
