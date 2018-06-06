import { Injectable, EventEmitter } from '@angular/core';
import { Issue } from './../models/issue';

@Injectable({
    providedIn: 'root'
})
export class IssueService {

    public issueList: Issue[] = [
        {
            id: '1',
            title: 'Issue1',
            description: 'This is issue 1',
            storyPoint: 3,
            type: 'bug',
            stage: 'backlog'
        },
        {
            id: '2',
            title: 'Issue12',
            description: 'This is issue 1',
            storyPoint: 3,
            type: 'bug',
            stage: 'backlog'
        }
    ];
    public issueListChanged = new EventEmitter<Issue[]>();

    public constructor() { }

    public getAllIssue() {
        return this.issueList;
    }

    public createIssue(data: Issue) {
        this.issueList.push(data);
        this.issueListChanged.emit(this.issueList);
    }

    public updateIssue(data: Issue) {
        this.issueList = this.issueList.map(
            elem => elem.id.toString() === data.id.toString() ? data : elem
        );
        this.issueListChanged.emit(this.issueList);
    }

    public deleteIssue(id: string) {
        this.issueList = this.issueList.filter(elem => elem.id.toString() !== id.toString());
        this.issueListChanged.emit(this.issueList);
    }
}
