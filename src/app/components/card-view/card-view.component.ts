import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActionType } from './../../models/action-type.enum';

@Component({
    selector: 'app-card-view',
    templateUrl: './card-view.component.html',
    styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit {

    @Output() public editDialog = new EventEmitter<ActionType>();
    public constructor() { }

    public ngOnInit() {}

    public editIssueDialog() {
        // this.editDialog.emit(ActionType.Update);
    }

}
