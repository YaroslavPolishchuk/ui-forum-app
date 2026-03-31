import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ForumService } from '../../services/forum.service';
import { AuthService } from '../../services/auth.service';
import { Topic } from '../../models/topic.model';
import { Forum } from '../../models/forum.model';

@Component({
  selector: 'app-forum-topics',
  imports: [CommonModule, RouterModule],
  templateUrl: './forum-topics.component.html',
  styleUrl: './forum-topics.component.css'
})
export class ForumTopicsComponent implements OnInit {

  forumId: number = 0;
  forum: Forum | null = null;
  topics: Topic[] = [];
  loading: boolean = true;

  constructor(
    public authService: AuthService,
    private forumService: ForumService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.forumId = +id;
        this.loadForumData();
      }
    });
  }

  loadForumData(): void {
    this.loading = true;

    // this.forumService.getForumById(this.forumId).subscribe({
    //   next: (data: Forum) => {
    //     this.forum = data;
    //   },
    //   error: (error: any) => console.error('Error loading forum details', error)
    // });

    this.forumService.getTopicsByForum(this.forumId).subscribe({
      next: (data: Topic[]) => {
        this.topics = data;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading forum topics', error);
        this.loading = false;
      }
    });
  }
}
