import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Issue } from './../models/issue';

@Injectable({
    providedIn: 'root'
})
export class IssueService {

    public issueList: Issue[] = [];
    private readonly apiUrl = 'https://aqueous-depths-69894.herokuapp.com/api/issues';
    public issueListChanged = new EventEmitter<Issue[]>();
    public issueObj = {};

    public constructor(private httpClient: HttpClient) { }

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

    public createIssueList(issues: Issue[]) {
        this.issueList = issues;
        this.buildIssueObject(this.issueList);
    }

    public addToIssueList(issue: Issue) {
        this.issueList.push(issue);
        this.buildIssueObject(this.issueList);
        this.issueListChanged.emit(this.issueList);
    }

    public updateIssueList(issue: Issue) {
        this.issueList = this.issueList.map(
            elem => elem['_id'].toString() === issue['_id'].toString() ? issue : elem
        );
        this.buildIssueObject(this.issueList);
        this.issueListChanged.emit(this.issueList);
    }

    public removeFromIssueList(id: string) {
        this.issueList = this.issueList.filter(elem => elem['_id'].toString() !== id.toString());
        this.buildIssueObject(this.issueList);
        this.issueListChanged.emit(this.issueList);
    }

    public getAllIssue() {
        return this.httpClient.get<any>(`${this.apiUrl}/getAllIssue`);
    }

    public createIssue(data: Issue) {
        return this.httpClient.post<any>(`${this.apiUrl}/create`, data);
    }

    public updateIssue(data: Issue) {
        return this.httpClient.put<any>(`${this.apiUrl}/update`, data);
    }

    public deleteIssue(id: string) {
        return this.httpClient.delete<any>(`${this.apiUrl}/delete/${id}`);
    }
}
