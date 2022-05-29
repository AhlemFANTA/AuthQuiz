// define, what'll be used later on
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Quiz, Question, Choice } from '../model/quiz.model';

// @Injectable decorator (function that augments a piece of code)
// tells Angular that this service will be available everywhere
@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  // contains namespace and type;
  // shortcut for: constructor(http: HttpClient){this.http = http;}
  constructor(private http: HttpClient) {
   }
   public getQuizzes() {
    return this.http.get(`./assets/json/quiz-list.json`).pipe(
      map((result: any[]) => {
        return result.map(r => new Quiz(r.label, r.name, r.description, r.fileName));
      })
    );
  }

  public getQuestions(fileName: string) {
    return this.http.get(`./assets/json/${fileName}.json`).pipe(
      map((result: any[]) => {
        return result.map(r => new Question( r.label,  r.choices.map(c => new Choice(c.value, false, c.mappings)),r.type, r.name));
      })
    );
  }
}
