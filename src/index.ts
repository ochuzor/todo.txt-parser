const isDateFormatValid = (dateString: string): boolean => {
    // date format is 'YYYY-MM-DD'
    return /^(\d{4})-(\d{1,2})-(\d{1,2})$/.test(dateString);
};

const isDateValueValid = (dateString: string): boolean => {
    // https://www.geeksforgeeks.org/how-to-check-a-date-is-valid-or-not-using-javascript/
    const d = new Date(dateString);
    return !Number.isNaN(d.getTime());
};

export const isValidDate = (dateString: string): boolean => {
    return isDateFormatValid(dateString) && isDateValueValid(dateString);
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

const filterByChar = (chr: string, tokens: string[]): string[] => {
    return tokens.reduce((acc, token) => {
        if (token.startsWith(chr)) {
            const val = token.replace(chr, '');
            if (val !== '') acc.push(val);
        }

        return acc;
    }, [] as string[]);
};

export const getProjects = filterByChar.bind(null, '+');

export const getContexts = filterByChar.bind(null, '@');

export interface TagDto {
    name: string;
    value: string;
}

export const getTags = (tokens: string[]): TagDto[] => {
    return tokens.reduce((acc, token) => {
        const tagBits = token.split(':');
        if (tagBits.length === 2) {
            acc.push({
                name: tagBits[0],
                value: tagBits[1],
            });
        }

        return acc;
    }, [] as TagDto[]);
};

interface TodoDto {
    text: string;
    isCompleted: boolean;
    priority: string;
    dateOfCreation: string;
    dateOfCompletion: string;
    projects: string[];
    contexts: string[];
    tags: TagDto[];
}

export const todoTextToDto = (text: string): TodoDto => {
    const tokens = getTokens(text);

    const todo = {} as TodoDto;
    todo.text = text;
    todo.isCompleted = isTaskCompleted(tokens);
    todo.priority = getPriority(tokens);
    todo.dateOfCreation = getDateOfCreation(tokens);
    todo.dateOfCompletion = getDateOfCompletion(tokens);
    todo.projects = getProjects(tokens);
    todo.contexts = getContexts(tokens);
    todo.tags = getTags(tokens);

    return todo;
};
