import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

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

    public constructor(public dialog: MatDialog) { }

    public ngOnInit() {
    }

}
