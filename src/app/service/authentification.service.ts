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
export class AuthentificationService {
  // contains namespace and type;
  // shortcut for: constructor(http: HttpClient){this.http = http;}
  constructor(private http: HttpClient) {
   }
   public getModel() {
    return this.http.get(`./assets/json/modelML.json`);
  }

}
