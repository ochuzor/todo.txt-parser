export interface TodoIndexDto {
    // stores the entire text used to create this index-dto.
    Text: string;

    description: string;
    isCompleted: string;
    priority: string;
    dateOfCreation: string;
    dateOfCompletion: string;
    projects: string;
    contexts: string;
    tags: string;
}
