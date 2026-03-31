import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumHeaderComponent } from './Comp/forum-header/forum-header.component';
import { ForumContainerComponent } from './Comp/forum-container/forum-container.component';
import { RegisterComponent } from './register/register.component';
import { ForumTopicsComponent } from './Comp/forum-topics/forum-topics.component';
@Component({
  selector: 'app-root',
  imports: [ForumHeaderComponent, RouterModule],
  template: `
    <app-forum-header></app-forum-header>
    <router-outlet></router-outlet>
  `,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { }

export const routes: Routes = [
  { path: '', component: ForumContainerComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forum/:id', component: ForumTopicsComponent }
];
