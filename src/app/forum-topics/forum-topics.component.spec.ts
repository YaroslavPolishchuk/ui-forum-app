import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ForumTopicsComponent } from './forum-topics.component';
import { ForumService } from '../services/forum.service';

describe('ForumTopicsComponent', () => {
  let component: ForumTopicsComponent;
  let fixture: ComponentFixture<ForumTopicsComponent>;

  beforeEach(async () => {
    const mockForumService = {
      getForumById: () => of({}),
      getDiscussionsByForum: () => of([])
    };

    await TestBed.configureTestingModule({
      imports: [ForumTopicsComponent],
      providers: [
        { provide: ForumService, useValue: mockForumService },
        { provide: ActivatedRoute, useValue: { paramMap: of({ get: () => '1' }) } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
