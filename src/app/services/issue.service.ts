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
            title: 'Issue2',
            description: 'This is issue 1',
            storyPoint: 3,
            type: 'bug',
            stage: 'backlog'
        },
        {
            id: '3',
            title: 'Issue3',
            description: 'This is issue 3',
            storyPoint: 3,
            type: 'bug',
            stage: 'develop'
        }


    ];
    public issueListChanged = new EventEmitter<Issue[]>();
    public issueObj = {};

    public constructor() { }

    public getAllIssue() {
        this.buildIssueObject(this.issueList);
        return this.issueList;
    }

    private buildIssueObject(issues: Issue[]) {
        this.issueObj = {
            backlog: [],
            plan: [],
            develop: [],
            test: [],
            deploy: [],
            done: []
        };
        issues.forEach((elem, index) => {
            // if (!this.issueObj[elem.stage])
            //     this.issueObj[elem.stage] = [];

            this.issueObj[elem.stage].push(elem);
        });
    }

    public createIssue(data: Issue) {
        this.issueList.push(data);
        this.buildIssueObject(this.issueList);
        this.issueListChanged.emit(this.issueList);
    }

    public updateIssue(data: Issue) {
        this.issueList = this.issueList.map(
            elem => elem.id.toString() === data.id.toString() ? data : elem
        );
        this.buildIssueObject(this.issueList);
        this.issueListChanged.emit(this.issueList);
    }

    public deleteIssue(id: string) {
        this.issueList = this.issueList.filter(elem => elem.id.toString() !== id.toString());
        this.buildIssueObject(this.issueList);
        this.issueListChanged.emit(this.issueList);
    }
}
