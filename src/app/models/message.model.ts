export interface Message {
    id: number;
    discussionId: number;
    authorName: string;
    content: string;
    createdAt: Date | string;
    updatedAt: Date | string;
}