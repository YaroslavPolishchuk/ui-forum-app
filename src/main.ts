import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { ForumContainerComponent } from './app/Comp/forum-container/forum-container.component';
import { RegisterComponent } from './app/register/register.component';
import { ForumTopicsComponent } from './app/Comp/forum-topics/forum-topics.component';
import { CreateTopicComponent } from './app/Comp/create-topic/create-topic.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiInterceptor } from './app/services/api.interceptors';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([apiInterceptor])),
    provideRouter([
      { path: '', component: ForumContainerComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forum/:id', component: ForumTopicsComponent },
      { path: 'forum/:id/create-topic', component: CreateTopicComponent }
    ])
  ]
})
  .catch(err => console.error(err));
