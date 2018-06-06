import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.scss']
})
export class FormAddComponent implements OnInit {

    public form: FormGroup;
    public description: string;
    public dialogTitle = 'Create Issue';

    public constructor(private fb: FormBuilder,
        private dialogRef: MatDialogRef<FormAddComponent>,
        @Inject(MAT_DIALOG_DATA) private data)
    {
            this.description = data.description;
            this.form = this.fb.group({
                title: [data.title, Validators.required],
                type: [data.type, Validators.required],
                description: [data.description, Validators.required],
                storypoint: [data.storyPoint, Validators.required],
                stage: [data.stage, Validators.required]
            });
    }

    public ngOnInit() {}

    public save() {
        console.log({ ...{id: this.data.id}, ...this.form.value});
        this.dialogRef.close({ ...{id: this.data.id}, ...this.form.value});
    }

    public close() {
        this.dialogRef.close();
    }
}
