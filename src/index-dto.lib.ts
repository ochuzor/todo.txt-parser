import { TodoIndexDto } from './TodoIndexDto';
import {
    getTokens,
    getDescription,
    getPriority,
    getDateOfCreation,
    getDateOfCompletion,
} from './text-dto.utils';

import {
    getProjectListString,
    getContextListString,
    getTagsListString,
    isTaskCompletedText,
} from './text-index-dto.utils';

export const textToIndexDto = (text: string): TodoIndexDto => {
    const tokens = getTokens(text);

    return {
        Text: text,
        description: getDescription(tokens),
        isCompleted: isTaskCompletedText(tokens),
        priority: getPriority(tokens),
        dateOfCreation: getDateOfCreation(tokens),
        dateOfCompletion: getDateOfCompletion(tokens),
        projects: getProjectListString(tokens),
        contexts: getContextListString(tokens),
        tags: getTagsListString(tokens),
    } as TodoIndexDto;
};
