import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActionType } from './../../models/action-type.enum';

@Component({
    selector: 'app-form-add',
    templateUrl: './form-add.component.html',
    styleUrls: ['./form-add.component.scss']
})
export class FormAddComponent implements OnInit {

    private form: FormGroup;
    public deleteForm: boolean;

    public constructor(private fb: FormBuilder,
        private dialogRef: MatDialogRef<FormAddComponent>,
        @Inject(MAT_DIALOG_DATA) private data) {
            this.form = this.fb.group({
                title: [data.title, Validators.required],
                type: [data.type, Validators.required],
                description: [data.description, Validators.required],
                storyPoint: [data.storyPoint, Validators.required],
                stage: [
                    {value: data.stage, disabled: data.action === ActionType.Add},
                    Validators.required
                ]
            });
    }

    public ngOnInit() {
        this.deleteForm = this.data.action === ActionType.Delete ? true : false;
    }

    // Getting dialouge title based on type of action
    public get getDialogTitle() {
        switch (this.data.action) {
            case ActionType.Add:
                return 'Add Issue';
            case ActionType.Update:
                return 'Update Issue';
            case ActionType.Delete:
                return 'Delete Issue';
            default:
                return '';
        }
    }

    // Getting submit button text based on type of action
    public get getButtonText() {
        switch (this.data.action) {
            case ActionType.Add:
                return 'Create';
            case ActionType.Update:
                return 'Update';
            case ActionType.Delete:
                return 'Delete';
            default:
                return '';
        }
    }

    // function will be called while submitting the dialogue
    public save() {
        const id = this.data.action === ActionType.Add ? Date.now() : this.data['_id'];
        this.dialogRef.close({ ...{ id, stage: this.data.stage }, ...this.form.value});
    }

    // function will be called while closing the dialouge
    public close() {
        this.dialogRef.close();
    }
}
