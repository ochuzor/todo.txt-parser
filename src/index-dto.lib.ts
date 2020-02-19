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
    getTagListString,
    isTaskCompletedText,
} from './text-index-dto.utils';

export const textToIndexDto = (text: string): TodoIndexDto => {
    const tokens = getTokens(text);

    return {
        text,
        description: getDescription(tokens),
        isCompleted: isTaskCompletedText(tokens),
        priority: getPriority(tokens),
        dateOfCreation: getDateOfCreation(tokens),
        dateOfCompletion: getDateOfCompletion(tokens),
        projects: getProjectListString(tokens),
        contexts: getContextListString(tokens),
        tags: getTagListString(tokens),
    } as TodoIndexDto;
};
