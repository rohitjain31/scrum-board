import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActionType } from './../../models/action-type.enum';
import { Issue } from './../../models/issue';

@Component({
    selector: 'app-card-view',
    templateUrl: './card-view.component.html',
    styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit {

    @Input() public issueValue: Issue;
    @Output() public editDialog = new EventEmitter<Issue>();
    @Output() public deleteDialog = new EventEmitter<Issue>();

    public constructor() { }

    public ngOnInit() {}

    // Emitting issue data for edit functionality
    public editIssueDialog() {
        this.editDialog.emit(this.issueValue);
    }

    // Emitting issue data for delete functionality
    public deleteIssueDialog() {
        this.deleteDialog.emit(this.issueValue);
    }

}
