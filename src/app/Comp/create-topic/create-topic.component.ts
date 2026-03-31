import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ForumService } from '../../services/forum.service';
import { Topic } from '../../models/topic.model';

@Component({
  selector: 'app-create-topic',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './create-topic.component.html',
  styleUrl: './create-topic.component.css'
})
export class CreateTopicComponent implements OnInit {
  forumId: number = 0;
  topic: Partial<Topic> = {
    title: '',
    content: '',
    authorName: localStorage.getItem('user') || '',
  };
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private forumService: ForumService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.forumId = +id;
        this.topic.forumId = this.forumId;
      }
    });
  }

  onSubmit(): void {
    if (!this.topic.title || !this.topic.content) return;

    this.isSubmitting = true;
    this.forumService.createTopic(this.topic).subscribe({
      next: () => {
        this.router.navigate(['/forum', this.forumId]);
      },
      error: (err) => {
        console.error('Error creating topic', err);
        this.isSubmitting = false;
      }
    });
  }
}
