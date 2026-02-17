import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { ForumContainerComponent } from './app/forum-container/forum-container.component';
import { RegisterComponent } from './app/register/register.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent,{
  providers:[
    provideHttpClient(),
    provideRouter([
      {path:'',component:ForumContainerComponent},
      {path:'register',component:RegisterComponent}
    ])
  ]
})
  .catch(err => console.error(err));
