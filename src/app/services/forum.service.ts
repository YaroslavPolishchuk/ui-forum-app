import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/env';
import { Forum } from '../models/forum.model';
import { Topic } from '../models/topic.model';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  constructor(private http: HttpClient) { }

  getForums(): Observable<Forum[]> {
    return this.http.get<Forum[]>(`${environment.forums}`);
  }

  getForumById(forumId: number): Observable<Forum> {
    return this.http.get<Forum>(`${environment.forums}/${forumId}`);
  }

  getTopicsByForum(forumId: number): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${environment.discussions}?forumId=${forumId}`);
  }

  createTopic(topic: Partial<Topic>): Observable<Topic> {
    return this.http.post<Topic>(`${environment.discussions}`, topic);
  }

  getMessagesByDiscussion(discussionId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.messages}?discussionId=${discussionId}`);
  }

  createMessage(message: Partial<Message>): Observable<Message> {
    return this.http.post<Message>(`${environment.messages}`, message);
  }
}
