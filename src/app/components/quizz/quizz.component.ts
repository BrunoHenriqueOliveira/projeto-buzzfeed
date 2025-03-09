import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import quizz_questions from "../../../assets/data/quizz_questions.json";

@Component({
  selector: 'app-quizz',
  standalone: true, // Corrigido para standalone components
  imports: [NgIf, NgForOf],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit {
  title: string = "";
  questions: any[] = [];
  questionSelected: any = null;
  answers: string[] = [];
  answerSelected: string = "";

  questionId: number = 0;
  questionMaxId: number = 0;
  finished: boolean = false;

  ngOnInit(): void {
    if (quizz_questions) {
      this.title = quizz_questions.title;
      this.questions = quizz_questions.questions;
      this.questionMaxId = this.questions.length;
      this.questionSelected = this.questions[this.questionId]; // Definir após questionMaxId
    }
  }

  playerChoose(answer: string): void {
    this.answers.push(answer);
    this.nextStep();
  }

  private nextStep(): void {
    this.questionId++;

    if (this.questionId < this.questionMaxId) {
      this.questionSelected = this.questions[this.questionId];
    } else {
      this.finished = true;
      this.calculateResult();
    }
  }

  private calculateResult(): void {
    const finalAnswer = this.getMostFrequentAnswer(this.answers);
    this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];
  }

  private getMostFrequentAnswer(answers: string[]): string {
    return answers.reduce((prev, curr) =>
      answers.filter(item => item === prev).length >= answers.filter(item => item === curr).length ? prev : curr
    );
  }
}
