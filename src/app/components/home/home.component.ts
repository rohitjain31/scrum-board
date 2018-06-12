import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { FormAddComponent } from './../form-add/form-add.component';
import { IssueService } from './../../services/issue.service';
import { MatSnackBar } from '@angular/material';
import { Issue } from './../../models/issue';
import { ActionType } from './../../models/action-type.enum';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public tiles = [];
    public allIssue: Issue[] = [];
    public issueObjects: any;

    public actionType: ActionType;
    public loading = false;

    public extraTiles = new Array(3).fill(1);

    private readonly dialogConfig = new MatDialogConfig();

    public constructor(public dialog: MatDialog,
        private snackBar: MatSnackBar,
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
        this.tiles = this.issueService.tilesInfo;

        this.issueService.issueListChanged.subscribe((data: Issue[]) => {
            this.allIssue = data;
            this.issueObjects = this.issueService.issueObj;
        });
        this.getAllIssue();
    }

    public showMessage(message) {
        this.snackBar.open(message, '', {
            duration: 2000
        });
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
                this.showMessage('There is some error. Please try again!!!');
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
                        this.showMessage('Issue added successfully');
                    }, (error) => {
                        this.loading = false;
                        this.showMessage('There is some error. Please try again!!!');
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
                        this.showMessage('Issue updated successfully');
                    }, (error) => {
                        this.loading = false;
                        this.showMessage('There is some error. Please try again!!!');
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
                        this.showMessage('Issue deleted successfully');
                    }, (error) => {
                        this.loading = false;
                        this.showMessage('There is some error. Please try again!!!');
                    });
            }
        });
    }

}
