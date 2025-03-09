import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent {
  title:string = "";

  questions:any = "";
  questionSelected:any = "";
  answers:string[] = [];
  answerSelected:string = "";

  questionId:number = 0;
  questionMaxId:number = 0;

  finished:boolean = false;

  ngOnInit() {
    if (quizz_questions) {
      this.finished = false
      this.title = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionId];

      this.questionId = 0
      this.questionMaxId = this.questions.length;
    }
  }

  playerChoose(val:string) {
    this.answers.push(val);
    this.nextStep()
  }

  async nextStep(){
    this.questionId += 1;

    if (this.questionMaxId > this.questionId) {
      this.questionSelected = this.questions[this.questionId]
    } else {
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true;
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];
    }
  }

  async checkResult(answer:string[]) {
    const result = answer.reduce((previous, current, i, arr) => {
      if (
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ){
        return previous;
      } else {
        return current
      }
    })
    return result;
  }
}
