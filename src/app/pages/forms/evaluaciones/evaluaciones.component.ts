import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-evaluaciones',
  templateUrl: './evaluaciones.component.html',
  styleUrls: ['./evaluaciones.component.scss']
})
export class EvaluacionesComponent  {
  myForm: FormGroup;
  questions = [];
  questionCounter

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.questionCounter = 0;
  }

  addQuestion() {
    const question = {
      id: this.questions.length,
      question: '',
      answerType: '',
      value: '',
      category: '',
      options: this.fb.array([this.fb.control('')]),
      optionsValue: this.fb.array([this.fb.control('')]),
      optionsText: this.fb.array([this.fb.control('')])
    };

    this.questions.push(question);
    this.myForm.addControl(`question${question.id}`, this.fb.control(''));
    this.myForm.addControl(`answerType${question.id}`, this.fb.control(''));
    this.myForm.addControl(`value${question.id}`, this.fb.control(''));
    this.myForm.addControl(`category${question.id}`, this.fb.control(''));
    this.myForm.addControl(`options${question.id}`, this.fb.array([this.fb.control('')]));
    this.myForm.addControl(`optionsValue${question.id}`, this.fb.array([this.fb.control('')]));
    this.myForm.addControl(`optionsText${question.id}`, this.fb.array([this.fb.control('')]));
  }

  removeQuestion(index: number) {
    this.questions.splice(index, 1);
    this.myForm.removeControl(`question${index}`);
    this.myForm.removeControl(`answerType${index}`);
    this.myForm.removeControl(`value${index}`);
    this.myForm.removeControl(`category${index}`);
    this.myForm.removeControl(`options${index}`);
    this.myForm.removeControl(`optionsValue${index}`);
    this.myForm.removeControl(`optionsText${index}`);
  }

  addOption(questionId: number) {
    const optionsArray = this.myForm.get(`options${questionId}`) as FormArray;
    optionsArray.push(this.fb.control(''));
    const optionsArrayValue = this.myForm.get(`optionsValue${questionId}`) as FormArray;
    optionsArrayValue.push(this.fb.control(''));
    const optionsArrayText = this.myForm.get(`optionsText${questionId}`) as FormArray;
    optionsArrayText.push(this.fb.control(''));
  }

  removeOption(questionId: number, optionIndex: number) {
    const optionsArray = this.myForm.get(`options${questionId}`) as FormArray;
    optionsArray.removeAt(optionIndex);
    const optionsArrayValue = this.myForm.get(`optionsValue${questionId}`) as FormArray;
    optionsArrayValue.removeAt(optionIndex);
    const optionsArrayText = this.myForm.get(`optionsText${questionId}`) as FormArray;
    optionsArrayText.removeAt(optionIndex);
  }
  createQuestion(): FormGroup {
    return this.fb.group({
      id: this.questionCounter++,
      question: '',
      answerType: 'short',
      value: '',
      category: '',
      options: this.fb.array([this.fb.control('')]),
      optionsValue: this.fb.array([this.fb.control('')]),
      optionsText: this.fb.array([this.fb.control('')])
    });
  }
  onSubmit() {
    console.log(this.myForm.value);
  }
}
