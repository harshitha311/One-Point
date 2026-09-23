import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormSubmission } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private apiUrl = 'https://onepoint-production-9672.up.railway.app/api/submissions';

  constructor(private http: HttpClient) {}

  submitPublicForm(submission: FormSubmission): Observable<FormSubmission> {
    return this.http.post<FormSubmission>(`${this.apiUrl}/public`, submission);
  }

  submitAuthorizedForm(submission: FormSubmission): Observable<FormSubmission> {
    return this.http.post<FormSubmission>(this.apiUrl, submission);
  }

  getDraftByToken(token: string): Observable<FormSubmission> {
    return this.http.get<FormSubmission>(`${this.apiUrl}/resume/${token}`);
  }

  getFormSubmissions(formId: number): Observable<FormSubmission[]> {
    return this.http.get<FormSubmission[]>(`${this.apiUrl}/form/${formId}`);
  }
}
