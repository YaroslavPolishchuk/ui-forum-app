export interface Topic {
    readonly id: number;
    forumId: number;
    title: string;
    content: string;
    authorName: string;
    readonly createdAt: Date | string;
    readonly updatedAt: Date | string;
}