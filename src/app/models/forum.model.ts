import { Topic } from "./topic.model";

export interface Forum {
  id: number;
  title: string;
  description: string;
  topicCount?: number;
  postCount?: number;
  latestDiscussion?: Topic;
}
