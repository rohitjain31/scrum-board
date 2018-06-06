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
    tiles = [
        {text: 'Backlog', color: 'lightblue'},
        {text: 'Plan', color: 'lightgreen'},
        {text: 'Develop', color: 'lightpink'},
        {text: 'Test', color: '#DDBDF1'},
        {text: 'Deploy', color: 'lightgreen'},
        {text: 'Done', color: 'lightblue'},
    ];

    public constructor(public dialog: MatDialog,
        private issueService: IssueService) { }

    public ngOnInit() {}

    public openCreateIssueDialouge() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            description: 'description',
            longDescription: 'longDescription',
            category: 'category',
            storypoint: 5
        };

        dialogConfig.width = '500px';
        dialogConfig.height = '430px';

        const dialogRef = this.dialog.open(FormAddComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(
            data => console.log('Dialog output:', data)
        );
    }

    public editIssueDialog(value) {

    }

}
