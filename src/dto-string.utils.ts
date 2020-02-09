import { TagDto } from './TodoDto';

const appendStringToEach = (chr: string, texts: string[]): string[] => {
    return texts.map(text => chr + text);
};

export const contextListToString = (contexts: string[]): string => {
    return appendStringToEach('@', contexts).join(' ');
};

export const projectListToString = (contexts: string[]): string => {
    return appendStringToEach('+', contexts).join(' ');
};

export const tagListToString = (tags: TagDto[]): string => {
    return tags.reduce((acc, tag) => {
        return ` ${acc} ${tag.name}:${tag.value}`;
    }, '');
};
