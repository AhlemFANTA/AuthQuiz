import { Component } from '@angular/core';
import { QuestionsService } from '../../service/questions.service';
import { Quiz } from '../../model/quiz.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  private quiz: Quiz[];

  constructor(private questionsService: QuestionsService) {
    this.questionsService.getQuizzes()
      .subscribe(quiz => {
        this.quiz = quiz;
      });
  }



}
