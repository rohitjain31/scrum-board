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

    public rowHeight: 'fit';
    public tiles = [
        {text: 'Backlog', color: 'lightblue', issues: []},
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

        this.issueService.issueListChanged.subscribe((data: Issue[]) => {
            this.allIssue = data;
        });
        // this.dialogConfig.height = '450px';
        this.getAllIssue();
    }


    public getAllIssue() {
        // loader
        this.allIssue = this.issueService.getAllIssue();
    }

    public operationOnIssueList(data: Issue) {
        switch (this.actionType) {
            case ActionType.Update:
                this.updateIssueList(data);
                break;
            case ActionType.Add:
                this.addIssue(data);
                break;
            default:
                break;
        }
    }

    public updateIssueList(data: Issue) {
        this.issueService.updateIssue(data);
    }

    public addIssue(data: Issue) {

    }

    public openCreateIssueDialouge() {
        this.actionType = ActionType.Add;

        const dialogRef = this.dialog.open(FormAddComponent, this.dialogConfig);

        dialogRef.afterClosed().subscribe(data => this.operationOnIssueList(data));
    }

    public editIssueDialog(value) {
        console.log(value);
        this.actionType = ActionType.Update;
        this.dialogConfig.data = value;
        const dialogRef = this.dialog.open(FormAddComponent, this.dialogConfig);

        dialogRef.afterClosed().subscribe(data => this.issueService.updateIssue(data));
    }

}
