import { IDoc } from './TodoDto';

export interface TodoIndexDto extends IDoc {
    // stores the entire text used to create this index-dto.
    text: string;

    description: string;
    isCompleted: string;
    priority: string;
    dateOfCreation: string;
    dateOfCompletion: string;
    projects: string;
    contexts: string;
    tags: string;
}
