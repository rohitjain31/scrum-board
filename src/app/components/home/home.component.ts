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
    public allIssue: Issue[] = [];
    public issueObjects: any;

    public actionType: ActionType;
    public loading = false;

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
        this.loading = true;
        this.issueService.getAllIssue()
            .subscribe((response) => {
                this.loading = false;
                this.issueService.createIssueList(response.issues);
                this.allIssue = response.issues;
                this.issueObjects = this.issueService.issueObj;
            }, (error) => {
                this.loading = false;
                console.log(error);
            });
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
            if (data) {
                this.loading = true;
                this.issueService.createIssue(data)
                    .subscribe((response) => {
                        this.loading = false;
                        this.issueService.addToIssueList(response.issue);
                    }, (error) => {
                        this.loading = false;
                        console.log(error);
                    });
            }
        });
    }

    public editIssueDialog(value) {
        this.actionType = ActionType.Update;
        this.dialogConfig.data = {...{ action: this.actionType }, ...value};
        const dialogRef = this.dialog.open(FormAddComponent, this.dialogConfig);

        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this.loading = true;
                this.issueService.updateIssue(data)
                    .subscribe((response) => {
                        this.loading = false;
                        this.issueService.updateIssueList(response.issue);
                    }, (error) => {
                        this.loading = false;
                        console.log(error);
                    })
            }
        });
    }

    public deleteIssue(value) {
        this.actionType = ActionType.Delete;
        this.dialogConfig.data = {...{ action: this.actionType }, ...value};
        const dialogRef = this.dialog.open(FormAddComponent, this.dialogConfig);

        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this.loading = true;
                this.issueService.deleteIssue(data.id)
                    .subscribe((response) => {
                        this.loading = false;
                        this.issueService.removeFromIssueList(data.id);
                    }, (error) => {
                        this.loading = false;
                        console.log(error);
                    });
            }
        });
    }

}
