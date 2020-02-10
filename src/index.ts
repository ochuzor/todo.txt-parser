import { TodoDto } from './TodoDto';
import {
    contextListToString,
    projectListToString,
    tagListToString,
    collapseWhitespace,
} from './dto-string.utils';

import {
    getTokens,
    getDescription,
    getDateOfCreation,
    getDateOfCompletion,
    isTaskCompleted,
    getPriority,
    getProjects,
    getContexts,
    getTags,
} from './text-dto.utils';

export const textToDto = (text: string): TodoDto => {
    const tokens = getTokens(text);

    const todo = {} as TodoDto;
    todo.description = getDescription(tokens);
    todo.isCompleted = isTaskCompleted(tokens);
    todo.priority = getPriority(tokens);
    todo.dateOfCreation = getDateOfCreation(tokens);
    todo.dateOfCompletion = getDateOfCompletion(tokens);
    todo.projects = getProjects(tokens);
    todo.contexts = getContexts(tokens);
    todo.tags = getTags(tokens);

    return todo;
};

export const todoDtoToText = (dto: TodoDto): string => {
    const completed = dto.isCompleted ? 'x' : '';
    let text = `${completed} ${dto.dateOfCompletion} ${dto.dateOfCreation} ${dto.description}`;
    text += ` ${projectListToString(dto.projects)} ${contextListToString(
        dto.contexts
    )}`;
    text += ` ${tagListToString(dto.tags)}`;

    return collapseWhitespace(text);
};
