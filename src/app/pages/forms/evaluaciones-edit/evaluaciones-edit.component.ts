import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { FormService } from '../../../services/form.service';
import { SettingService } from '../../../services/setting.service';
import { ActivatedRoute, Router } from '@angular/router';
import { iForm } from '../../../models/form.model';

@Component({
  selector: 'ngx-evaluaciones-edit',
  templateUrl: './evaluaciones-edit.component.html',
  styleUrls: ['./evaluaciones-edit.component.scss']
})
export class EvaluacionesEditComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formSV: FormService,
    public sttSV: SettingService,
    private routers: ActivatedRoute,
    protected router: Router,
  ) {
    this.myForm = this.fb.group({
      id: new FormControl('', [Validators.required]),
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

  ngOnInit(): void {
    this.formSV.get({
      id: this.routers.snapshot.params.id
    }).subscribe((response: any) => {
      console.log('response', response)
      if (response.success) {
        this.setFormData(response.data)
      }
    })
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

  setFormData(form_data: iForm) {
    this.id.setValue(form_data.id)
    this.name.setValue(form_data.name)
    this.description.setValue(form_data.description)
    this.responsible_id.setValue(form_data.responsible_id)
    this.rating_type_id.setValue(form_data.rating_type_id)
    this.value_type.setValue(form_data.value_type)
    this.assigned_id.setValue(form_data.assigned_id)
    this.note.setValue(form_data.note)

    form_data.questions.forEach((question: any) => {
      this.questions.push(
        new FormGroup({
          id: new FormControl(question.id),
          question: new FormControl(question.question),
          number: new FormControl(this.questions.length),
          required: new FormControl(false),
          value_question: new FormControl(),
          description_question: new FormControl(),
          type: new FormControl(),
          default: new FormControl(''),
          category_id: new FormControl(),
          options: new FormArray(
            this.getOptions(question.options)
          ),
        })
      )
    });
  }

  getOptions(options: any) {
    return options.map((option: any) => new FormGroup({
      value: new FormControl(option.value),
      option: new FormControl(option.option)
    }))
  }

  addOption(index: number) {
    this.options(index).push(
      new FormGroup({
        value: new FormControl(),
        option: new FormControl()
      })
    )
  }

  removeElementFormArray(arrForm: FormArray, index: number) {
    arrForm.removeAt(index)
  }

  onSubmit() {
    this.formSV.store(this.myForm.value).subscribe((response: any) => {
      console.log('response', response);
      if (response.success) {
        this.sttSV.alert('Correcto', response.message, 'success')
      } else {
        this.sttSV.alert('Error', response.message, 'error')
      }
    });
  }

  get id() { return this.myForm.get('id') }
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
