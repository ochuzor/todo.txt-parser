import {
    filterByChar,
    isDateValid,
    omitCompletionAndPriorityMarkers,
    isPriorityMarker,
    omitDates,
    isValidTagTokens,
    isContextString,
    isProjectString,
} from './todo.utils';

export const getTokens = (str: string): string[] => {
    return str
        .split(' ')
        .map(t => t.trim())
        .filter(t => !!t);
};

export const isTaskCompleted = (tokens: string[]): boolean => {
    return tokens[0] === 'x';
};

export const getPriority = (tokens: string[]): string => {
    const [firstToken, secondToken] = tokens;

    if (isPriorityMarker(firstToken)) {
        return firstToken;
    }
    if (firstToken === 'x' && isPriorityMarker(secondToken)) {
        return secondToken;
    }

    return '';
};

export const getDateOfCompletion = (tokens: string[]): string => {
    if (tokens.length < 2) return '';

    const ls = omitCompletionAndPriorityMarkers(tokens);

    if (ls.length < 2) return '';

    const [dateStr1, dateStr2] = ls;
    if (isDateValid(dateStr1) && isDateValid(dateStr2)) {
        return dateStr1;
    }

    return '';
};

export const getDateOfCreation = (tokens: string[]): string => {
    const ls = omitCompletionAndPriorityMarkers(tokens);
    if (ls.length < 1) return '';

    const [dateStr1, dateStr2 = ''] = ls;
    if (isDateValid(dateStr1)) {
        return isDateValid(dateStr2) ? dateStr2 : dateStr1;
    }

    return '';
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
        if (isValidTagTokens(tagBits)) {
            acc.push({
                name: tagBits[0],
                value: tagBits[1],
            });
        }

        return acc;
    }, [] as TagDto[]);
};

/**
 * removes everything that's completion marker, priority, date of completion and creation,
 * contexts, projects and tags from the token list.
 * then returns what's left as a concatenated string
 *
 * if you follow the rules described on https://github.com/todotxt/todo.txt on placement of
 * data in your text (or be a little constructive), you would get a proper result.
 * otherwise, the result may be jumbled up.
 * @param tokens the string token values
 */
export const getDescription = (tokens: string[]): string => {
    const t = omitDates(tokens).filter(token => {
        return (
            !isProjectString(token) &&
            !isContextString(token) &&
            !isValidTagTokens(token.split(':'))
        );
    });

    return t.join(' ');
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
