import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { FormAddComponent } from './../form-add/form-add.component';
import { IssueService } from './../../services/issue.service';
import { Issue } from './../../models/issue';
import { ActionType } from './../../models/action-type.enum';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public tiles = [
        {text: 'Backlog', color: 'lightblue'},
        {text: 'Plan', color: 'lightgreen'},
        {text: 'Develop', color: 'lightpink'},
        {text: 'Test', color: '#DDBDF1'},
        {text: 'Deploy', color: 'lightgreen'},
        {text: 'Done', color: 'lightblue'},

    ];
    public allIssue: Issue[];
    public actionType: ActionType;

    private readonly dialogConfig = new MatDialogConfig();

    public constructor(public dialog: MatDialog,
        private issueService: IssueService) { }

    public ngOnInit() {
        this.dialogConfig.autoFocus = true;
        this.dialogConfig.width = '500px';
        this.dialogConfig.data = {
            title: '',
            description: '',
            storyPoint: null,
            type: '',
            stage: '',
        };

        this.issueService.issueListChanged.subscribe((data: Issue[]) => {
            this.allIssue = data;
        });
        this.getAllIssue();
    }


    public getAllIssue() {
        this.allIssue = this.issueService.getAllIssue();
    }

    public openCreateIssueDialouge() {
        this.actionType = ActionType.Add;
        this.dialogConfig.data = {
            title: '',
            description: '',
            storyPoint: null,
            type: '',
            stage: 'backlog',
            action: this.actionType
        };
        const dialogRef = this.dialog.open(FormAddComponent, this.dialogConfig);
        dialogRef.afterClosed().subscribe((data) => {
            if (data) this.issueService.createIssue(data);
        });
    }

    public editIssueDialog(value) {
        this.actionType = ActionType.Update;
        this.dialogConfig.data = {...{ action: this.actionType }, ...value};
        const dialogRef = this.dialog.open(FormAddComponent, this.dialogConfig);

        dialogRef.afterClosed().subscribe((data) => {
            if (data) this.issueService.updateIssue(data);
        });
    }

    public deleteIssue(value) {
        this.actionType = ActionType.Delete;
        this.dialogConfig.data = {...{ action: this.actionType }, ...value};
        const dialogRef = this.dialog.open(FormAddComponent, this.dialogConfig);

        dialogRef.afterClosed().subscribe((data) => {
            if (data) this.issueService.deleteIssue(data.id);
        });
    }

}
