import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/env';
import { Forum, Discussion, Message } from '../models/forum.model';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  constructor(private http: HttpClient) {}

  getForums(): Observable<Forum[]> {
    return this.http.get<Forum[]>(`${environment.apiUrl}${environment.forums}`);
  }

  getDiscussionsByForum(forumId: number): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(`${environment.apiUrl}${environment.discussions}?forumId=${forumId}`);
  }

  createDiscussion(discussion: Partial<Discussion>): Observable<Discussion> {
    return this.http.post<Discussion>(`${environment.apiUrl}${environment.discussions}`, discussion);
  }

  getMessagesByDiscussion(discussionId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.apiUrl}${environment.messages}?discussionId=${discussionId}`);
  }

  createMessage(message: Partial<Message>): Observable<Message> {
    return this.http.post<Message>(`${environment.apiUrl}${environment.messages}`, message);
  }
}
