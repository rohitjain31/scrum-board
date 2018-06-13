import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Issue } from './../models/issue';
import { TextKeys } from '../utils/text-keys';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class IssueService {

    public issueList: Issue[] = [];
    private readonly apiUrl = TextKeys.apiUrl;
    public issueListChanged = new EventEmitter<Issue[]>();
    public issueObj = {};
    public tilesInfo = [
        { text: TextKeys.backlog, color: TextKeys.backlogColor },
        { text: TextKeys.plan, color: TextKeys.planColor },
        { text: TextKeys.develop, color: TextKeys.developColor },
        { text: TextKeys.test, color: TextKeys.testColor },
        { text: TextKeys.deploy, color: TextKeys.deployColor },
        { text: TextKeys.done, color: TextKeys.doneColor }
    ];

    public constructor(private httpClient: HttpClient) { }

    // Creating an issue object so we can iterate based on issue stages.
    // thus issue defined for each stages will be displayed from first row
    // in that column.
    // Input Parameter -> issues - complete list of issues
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
            this.issueObj[elem.stage].push(elem);
        });
    }

    private handleError(err: HttpErrorResponse) {
        return throwError(err);
    }

    // Maintaing an issue list and building issue object from here
    public createIssueList(issues: Issue[]) {
        this.issueList = issues;
        this.buildIssueObject(this.issueList);
    }

    // Adding to issue list and building issue object
    // and emitting issue list so that changes will reflect on UI.
    // Input parameter -> issue - newly added issue
    public addToIssueList(issue: Issue) {
        this.issueList.push(issue);
        this.buildIssueObject(this.issueList);
        this.issueListChanged.emit(this.issueList);
    }

    // Updating to issue list and building issue object
    // and emitting issue list so that changes will reflect on UI.
    // Input parameter -> issue -> updated issue value
    public updateIssueList(issue: Issue) {
        this.issueList = this.issueList.map(
            elem => elem['_id'].toString() === issue['_id'].toString() ? issue : elem
        );
        this.buildIssueObject(this.issueList);
        this.issueListChanged.emit(this.issueList);
    }

    // Removing from issue list and building issue object
    // and emitting issue list so that changes will reflect on UI.
    // Input parameter -> id -> id of removed issue
    public removeFromIssueList(id: string) {
        this.issueList = this.issueList.filter(elem => elem['_id'].toString() !== id.toString());
        this.buildIssueObject(this.issueList);
        this.issueListChanged.emit(this.issueList);
    }

    // API call to get all issues.
    // It will return an observable.
    // return value in response after subscribe -> { error: false, issues: issues }
    public getAllIssue() {
        return this.httpClient.get<any>(`${this.apiUrl}/getAllIssue`).pipe(catchError(this.handleError));
    }

    // API call to create an issue.
    // It will return an observable.
    // return value in response after subscribe -> { error: false, issue: issue }
    public createIssue(data: Issue) {
        return this.httpClient.post<any>(`${this.apiUrl}/create`, data).pipe(catchError(this.handleError));
    }

    // API call to update an issue.
    // It will return an observable.
    // return value in response after subscribe -> { error: false, issue: issue }
    public updateIssue(data: Issue) {
        return this.httpClient.put<any>(`${this.apiUrl}/update`, data).pipe(catchError(this.handleError));
    }

    // API call to delete an issue.
    // It will return an observable.
    // return value in response after subscribe -> { error: false, result: null }
    public deleteIssue(id: string) {
        return this.httpClient.delete<any>(`${this.apiUrl}/delete/${id}`).pipe(catchError(this.handleError));
    }
}
