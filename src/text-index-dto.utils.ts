import { getProjects, getContexts, isTaskCompleted } from './text-dto.utils';

import { isValidTagTokens } from './todo.utils';

export const isTaskCompletedText = (tokens: string[]): string => {
    return isTaskCompleted(tokens) ? 'true' : 'false';
};

export const getProjectListString = (tokens: string[]): string => {
    return getProjects(tokens).join(' ');
};

export const getContextListString = (tokens: string[]): string => {
    return getContexts(tokens).join(' ');
};

export const getTagsListString = (tokens: string[]): string => {
    return tokens.reduce((acc, token) => {
        const tagBits = token.split(':');
        if (isValidTagTokens(tagBits)) {
            acc += tagBits;
        }

        return acc;
    }, '');
};
