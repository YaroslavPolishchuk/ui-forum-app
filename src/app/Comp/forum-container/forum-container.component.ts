import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { Forum } from '../../models/forum.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forum-container',
  templateUrl: './forum-container.component.html',
  styleUrls: ['./forum-container.component.css'],
  imports: [CommonModule, RouterModule]
})
export class ForumContainerComponent implements OnInit {
  forums: Forum[] = [];
  loading = true;

  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    this.forumService.getForums().subscribe({
      next: (data) => {
        this.forums = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load forums', err);
        this.loading = false;
      }
    });
  }
}
