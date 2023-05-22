import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { FormService } from '../../../services/form.service';
import { SettingService } from '../../../services/setting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-evaluaciones',
  templateUrl: './evaluaciones.component.html',
  styleUrls: ['./evaluaciones.component.scss']
})
export class EvaluacionesComponent {
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formSV: FormService,
    protected router: Router,
    public sttSV: SettingService,
  ) {
    this.myForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      responsible_id: new FormControl(1, [Validators.required]),
      rating_type_id: new FormControl(1, []),
      value_type: new FormControl(10, []),
      assigned_id: new FormControl(1, []),
      note: new FormControl(10, []),
      questions: new FormArray([
        // new FormGroup({
        //   question: new FormControl(),
        //   number: new FormControl(1),
        //   required: new FormControl(false),
        //   value_question: new FormControl(),
        //   description_question: new FormControl(),
        //   type: new FormControl(),
        //   default: new FormControl(''),
        //   category_id: new FormControl(),
        //   options: new FormArray([
        //     new FormGroup({
        //       value: new FormControl(),
        //       option: new FormControl()
        //     })
        //   ]),
        // })
      ])
    });
  }

  addQuestion() {
    this.questions.push(
      new FormGroup({
        question: new FormControl(),
        number: new FormControl(this.questions.length),
        required: new FormControl(false),
        value_question: new FormControl(),
        description_question: new FormControl(),
        type: new FormControl(),
        default: new FormControl(''),
        category_id: new FormControl(),
        options: new FormArray([
          // new FormGroup({
          //   value: new FormControl(),
          //   option: new FormControl()
          // })
        ]),
      })
    )
  }

  addOption(index: number) {
    this.options(index).push(
      new FormGroup({
        value: new FormControl(),
        option: new FormControl()
      })
    )
  }

  removeOption(questionId: number, optionIndex: number) {
    const optionsArray = this.myForm.get(`options${questionId}`) as FormArray;
    optionsArray.removeAt(optionIndex);
    const optionsArrayValue = this.myForm.get(`optionsValue${questionId}`) as FormArray;
    optionsArrayValue.removeAt(optionIndex);
    const optionsArrayText = this.myForm.get(`optionsText${questionId}`) as FormArray;
    optionsArrayText.removeAt(optionIndex);
  }

  onSubmit() {
    this.formSV.store(this.myForm.value).subscribe((response: any) => {
      console.log('response', response);
      if (response.success) {
        this.sttSV.alert('Correcto', response.message, 'success')
        this.router.navigate([`pages/forms/list-evaluaciones`]);
      } else {
        this.sttSV.alert('Error', response.message, 'error')
      }
    });
  }

  get name() { return this.myForm.get('name') }
  get description() { return this.myForm.get('description') }
  get responsible_id() { return this.myForm.get('responsible_id') }
  get rating_type_id() { return this.myForm.get('rating_type_id') }
  get value_type() { return this.myForm.get('value_type') }
  get assigned_id() { return this.myForm.get('assigned_id') }
  get note() { return this.myForm.get('note') }
  get questions() { return this.myForm.get('questions') as FormArray }
  options(index: number) { return this.questions.controls[index].get('options') as FormArray }
}
