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
    public issueObjects: any;

    public actionType: ActionType;

    public extraTiles = new Array(3).fill(1);

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
            this.issueObjects = this.issueService.issueObj;
        });
        this.getAllIssue();
    }

    maxTiles(count: number = 0){
        let max = 0;
        Object.keys(this.issueObjects).forEach((key) => {
            if(max < this.issueObjects[key].length){
                max = this.issueObjects[key].length;
            }
        });

        return (new Array(max - count)).fill(1);
    }
    public getAllIssue() {
        this.allIssue = this.issueService.getAllIssue();
        this.issueObjects = this.issueService.issueObj;
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
