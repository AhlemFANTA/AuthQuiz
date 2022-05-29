import { Component, Input, OnInit } from '@angular/core';
import { Answers, Question } from '../model/quiz.model';
import { AuthentificationService } from '../service/authentification.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit{

  constructor(public mlService: AuthentificationService){}


  // used to make answers available to parent component (= questions)
  // so that parent can pass it to child component (= results)
  @Input() answers: Answers;
  @Input() questions: Question[];

  public authentificationLevel = 0;

  /*
    criticite donnée:
      0: publique, 1: personnel, 2: privée, 3: essentiel
    exposition attaque:
      0: nulle, 1: faible, 2: moyen, 3: forte
    niveau authent:
      0: aucune, 1: via tiers, 2: interne, 3: multi fact, 4: multi fact+gestion risque
    taille structure:
      1: EURL/SARL, 2: PME/PMI, 3: Systémique
    type de stockage:
      0: non, 1: temporaire, 2: long terme
  */

  model = [
    {// Info Banque CM
      taille: 3,      // systémique
      criticiteDU: 2, // privée
      criticiteDS: 3, // essentiel
      exposition: 2,  // forte
      stockage: 1,  // oui
      identite: 1,  // données identité utilisateur: oui
      finance: 1,   // données finance: oui
      sante: 0,     // données sante: non
      privee: 1,    // données privées: oui
      reseauS: 0,   // données réseaux sociaux: non
      personnel: 1, // données personnel: oui
      authentification: 4
    }
  ];



  ngOnInit(): void {
    this.mlService.getModel().subscribe((data: any[]) => {
      data.forEach(item => this.model.push(item))
      console.log("ML DATA: ", this.model);
      this.computeAuthentificationLevel();
    });
  }

  private createItem() {
    let item = {
      taille: 0,
      criticiteDU: 0,
      criticiteDS: 0,
      exposition: 0,
      stockage: 0,
      identite: 0,
      finance: 0,
      sante: 0,
      privee: 0,
      reseauS: 0,
      personnel: 0,
      authentification: 0
    };
    const mappings = [].concat(...[]
      .concat(...this.questions.map(q => q.choices))
      .filter(c => c.selected && c.mappings).map(c => c.mappings));
    mappings.forEach(c => item[c.theme] = c.value);
    return item;
  }

  private computeAuthentificationLevel() {
    // ALGO naif:
    // trouve l'item du modèle qui est le plus proche de l'item généré à partir des données saisies
    // et retourne le type d'authentification de l'item du model:
    const targetItem = this.createItem();
    const modelItem = this.model.reduce((item1, item2) =>
      this.distance(item1, targetItem) <= this.distance(item2, targetItem)? item1 : item2);
    console.log("BEST MODEL ITEM:", modelItem);
    this.authentificationLevel = modelItem.authentification;
  }

  private distance(modelItem: any, targetItem: any) {
    const properties = ["taille", "criticiteDU", "criticiteDS", "exposition"
      , "stockage", "identite", "finance", "sante", "privee", "reseauS", "personnel"];
    const sum = properties.map(p => Math.pow(modelItem[p] - targetItem[p], 2)).reduce((x, y) => x+y);
    return Math.sqrt(sum);
  }

}
