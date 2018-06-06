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
        @Inject(MAT_DIALOG_DATA) data)
    {
            this.description = data.description;
            this.form = this.fb.group({
                description: [data.description, Validators.required],
                category: [data.category, Validators.required],
                longDescription: [data.longDescription, Validators.required],
                storypoint: [data.storypoint, Validators.required]
            });
    }

    public ngOnInit() {}

    public save() {
        this.dialogRef.close(this.form.value);
    }

    public close() {
        this.dialogRef.close();
    }
}
