import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {MatCheckboxModule, MatGridListModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatCardModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AppComponent} from './app.component';
import {QuestionFormComponent} from './question-form/question-form.component';
import {ResultsComponent} from './results/results.component';
import {WelcomeComponent} from './home/welcome/welcome.component';
import {QuestionsComponent} from './questions/questions.component';
import {HeaderComponent} from './home/header/header.component';
import {FooterComponent} from './home/footer/footer.component';


const appRoutes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  { path: '',
    component: WelcomeComponent,
    pathMatch: 'full'
  },
  {path: ':quizId', component: QuestionsComponent},
  {path: '*', redirectTo: 'welcome', pathMatch: 'prefix'},
];

@NgModule({
  declarations: [
    AppComponent,
    QuestionFormComponent,
    ResultsComponent,
    WelcomeComponent,
    QuestionsComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
