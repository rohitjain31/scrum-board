import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormAddComponent } from './../form-add/form-add.component';
import { IssueService } from './../../services/issue.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Issue } from './../../models/issue';
import { ActionType } from './../../models/action-type.enum';
import { TextKeys } from '../../utils/text-keys';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    private actionType: ActionType;
    private readonly dialogConfig = new MatDialogConfig();
    private addDialogeSubscription: Subscription;
    private editDialogSubscription: Subscription;
    private deleteDialogSubscription: Subscription;

    public tiles = [];
    public allIssue: Issue[] = [];
    public issueObjects: any;
    public loading = false;

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

    public ngOnDestroy() {
        this.addDialogeSubscription.unsubscribe();
        this.editDialogSubscription.unsubscribe();
        this.deleteDialogSubscription.unsubscribe();
    }

    // Reusable function to display snack bar message on
    // completion of any operation
    private showMessage(message) {
        this.snackBar.open(message, '', {
            duration: 2000
        });
    }

    // Reusable function to handle error
    // Here we are hiding loader and displaying error message
    private handleError(error) {
        this.loading = false;
        this.showMessage(TextKeys.errorMessage);
    }

    // number of block is maintained using this function for each stage.
    // we are calculating maximum length of any stage then creating that many blocks.
    public maxTiles(count: number = 0) {
        let max = 0;
        Object.keys(this.issueObjects).forEach((key) => {
            if (max < this.issueObjects[key].length) {
                max = this.issueObjects[key].length;
            }
        });

        return (new Array(max - count)).fill(1);
    }

    // Api call to get all the existing issues
    private getAllIssue() {
        this.loading = true;
        this.issueService.getAllIssue()
            .subscribe((response) => {
                this.loading = false;
                this.issueService.createIssueList(response.issues);
                this.allIssue = response.issues;
                this.issueObjects = this.issueService.issueObj;
            }, (error) => {
                this.handleError(error);
            });
    }

    // This function will open a dialogue to add an issue.
    // It will subscribe to dialouge close event and on dialogue close
    // it will call the api to create an issue.
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
        this.addDialogeSubscription = dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this.loading = true;
                this.issueService.createIssue(data)
                    .subscribe((response) => {
                        this.loading = false;
                        this.issueService.addToIssueList(response.issue);
                        this.showMessage(TextKeys.addMessage);
                    }, (error) => {
                        this.handleError(error);
                    });
            }
        });
    }

    // This function will open a dialogue to edit an issue.
    // It will subscribe to dialouge close event and on dialogue close
    // it will call the api to update an issue.
    private editIssueDialog(value) {
        this.actionType = ActionType.Update;
        this.dialogConfig.data = {...{ action: this.actionType }, ...value};
        const dialogRef = this.dialog.open(FormAddComponent, this.dialogConfig);

        this.editDialogSubscription = dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this.loading = true;
                this.issueService.updateIssue(data)
                    .subscribe((response) => {
                        this.loading = false;
                        this.issueService.updateIssueList(response.issue);
                        this.showMessage(TextKeys.updateMessage);
                    }, (error) => {
                        this.handleError(error);
                    });
            }
        });
    }

    // This function will open a dialogue to delete an issue.
    // It will subscribe to dialouge close event and on dialogue close
    // it will call the api to delete an issue.
    private deleteIssue(value) {
        this.actionType = ActionType.Delete;
        this.dialogConfig.data = {...{ action: this.actionType }, ...value};
        const dialogRef = this.dialog.open(FormAddComponent, this.dialogConfig);

        this.deleteDialogSubscription = dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this.loading = true;
                this.issueService.deleteIssue(data.id)
                    .subscribe((response) => {
                        this.loading = false;
                        this.issueService.removeFromIssueList(data.id);
                        this.showMessage(TextKeys.deleteMessage);
                    }, (error) => {
                        this.handleError(error);
                    });
            }
        });
    }

}
