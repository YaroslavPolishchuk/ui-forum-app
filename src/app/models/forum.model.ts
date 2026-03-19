export interface Message {
  id: number;
  discussionId: number;
  authorName: string;
  content: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Discussion {
  id: number;
  forumId: number;
  title: string;
  authorName: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  messageCount?: number;
  latestMessage?: Message;
}

export interface Forum {
  id: number;
  title: string;
  description: string;
  topicCount?: number;
  postCount?: number;
  latestDiscussion?: Discussion;
}
