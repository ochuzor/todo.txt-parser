export const isDateValid = (dateString: string): boolean => {
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
}

const priorityMarkers = ['(A)', '(B)', '(C)', '(D)', '(E)']
export const getPriority = (tokens: string[]): string => {
    const [firstToken, secondToken] = tokens;
    if (priorityMarkers.includes(firstToken)) return firstToken;
    else if (firstToken === 'x' && priorityMarkers.includes(secondToken)) return secondToken;
    else return '';
}
