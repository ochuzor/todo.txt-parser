export interface TagDto {
    name: string;
    value: string;
}

export interface TodoDto {
    description: string;
    isCompleted: boolean;
    priority: string;
    dateOfCreation: string;
    dateOfCompletion: string;
    projects: string[];
    contexts: string[];
    tags: TagDto[];
}
