import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { ForumContainerComponent } from './app/forum-container/forum-container.component';
import { RegisterComponent } from './app/register/register.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiInterceptor } from './app/services/api.interceptors';

bootstrapApplication(AppComponent,{
  providers:[
    provideHttpClient(withInterceptors([apiInterceptor])),
    provideRouter([
      {path:'',component:ForumContainerComponent},
      {path:'register',component:RegisterComponent}
    ])
  ]
})
  .catch(err => console.error(err));
