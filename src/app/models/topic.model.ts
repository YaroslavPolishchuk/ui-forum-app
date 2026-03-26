export interface Topic {
    id: number;
    forumId: number;
    title: string;
    content: string;
    authorName: string;
    createdAt: Date | string;
    updatedAt: Date | string;
}