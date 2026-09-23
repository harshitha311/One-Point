import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardMetrics, FormAnalytics } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private dashboardUrl = 'https://onepoint-production-9672.up.railway.app/dashboard';
  private analyticsUrl = 'https://onepoint-production-9672.up.railway.app/analytics';
  private exportUrl = 'https://onepoint-production-9672.up.railway.app/export';

  constructor(private http: HttpClient) {}

  getDashboardMetrics(): Observable<DashboardMetrics> {
    return this.http.get<DashboardMetrics>(`${this.dashboardUrl}/metrics`);
  }

  getFormAnalytics(formId: number): Observable<FormAnalytics> {
    return this.http.get<FormAnalytics>(`${this.analyticsUrl}/form/${formId}`);
  }

  downloadExport(formId: number, format: 'csv' | 'excel' | 'pdf'): void {
    const url = `${this.exportUrl}/form/${formId}/${format}`;
    this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      const extension = format === 'excel' ? 'xlsx' : format;
      a.download = `form_${formId}_responses.${extension}`;
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
}
