import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SiteMetadata } from '../models/siteMetadata.model';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Analytics {
  apiUrl = 'http://localhost:3000/';
  //newApiUrl = 'http://127.0.0.1:5000/'
  newApiUrl = 'https://venegames21.pythonanywhere.com/'
  httpClient = inject(HttpClient);

  getSitesMetadata(){
    return this.httpClient.get<any>(this.newApiUrl + 'sites');
  }

  getSiteMetadataById(siteId: string){
    return this.httpClient.get<any>(this.newApiUrl + `sites/${siteId}`);
  }
  
  getSiteAnalyticsTimeseriesById(siteId: string, startDate?: string, endDate?: string){
    let params = new HttpParams().set('siteId', siteId);
    if(startDate) params = params.set('startDate', startDate);
    if(endDate) params = params.set('endDate', endDate);
    return this.httpClient.get<any>(this.newApiUrl + `analytics/timeseries`, {params});
  }

  getSiteAnalyticsReferrersById(siteId: string, startDate?: string, endDate?: string){
    let params = new HttpParams().set('siteId', siteId);
    if(startDate) params = params.set('startDate', startDate);
    if(endDate) params = params.set('endDate', endDate);
    return this.httpClient.get<any>(this.newApiUrl + `analytics/referrers`, {params});
  }

  getSiteEngagementMetricsById(siteId: string, startDate?: string, endDate?: string){
    let params = new HttpParams().set('siteId', siteId);
    if(startDate) params = params.set('startDate', startDate);
    if(endDate) params = params.set('endDate', endDate);
    return this.httpClient.get<any>(this.newApiUrl + `analytics/engagement`, {params});
  }

  getSitePagesOverviewById(siteId: string, startDate?: string, endDate?: string){
    let params = new HttpParams().set('siteId', siteId);
    if(startDate) params = params.set('startDate', startDate);
    if(endDate) params = params.set('endDate', endDate);
    return this.httpClient.get<any>(this.newApiUrl + `analytics/pages_overview`, {params});
  }

  getSiteDevicesOverviewById(siteId: string, startDate?: string, endDate?: string){
    let params = new HttpParams().set('siteId', siteId);
    if(startDate) params = params.set('startDate', startDate);
    if(endDate) params = params.set('endDate', endDate);
    return this.httpClient.get<any>(this.newApiUrl + `analytics/devices`, {params});
  }

  getSiteGeolocationDataById(siteId: string, startDate?: string, endDate?: string){
    let params = new HttpParams().set('siteId', siteId);
    if(startDate) params = params.set('startDate', startDate);
    if(endDate) params = params.set('endDate', endDate);
    return this.httpClient.get<any>(this.newApiUrl + `analytics/geo`, {params});
  }

  getSiteHintsById(siteId: string, startDate?: string, endDate?: string){
    let params = new HttpParams();
    params = params.set('siteId', siteId);
    if(startDate) params = params.set('startDate', startDate);
    if(endDate) params = params.set('endDate', endDate);
    return this.httpClient.get<any>(this.newApiUrl + `analytics/site_hints`, {params});
  }

  getAllDataFromSiteById(siteId: string, startDate?: string, endDate?: string): Observable<any>{
    return forkJoin({
      timeseries: this.getSiteAnalyticsTimeseriesById(siteId, startDate, endDate),
      referrers: this.getSiteAnalyticsReferrersById(siteId, startDate, endDate),
      metadata: this.getSiteMetadataById(siteId),
      engagement: this.getSiteEngagementMetricsById(siteId, startDate, endDate),
      pagesOverview: this.getSitePagesOverviewById(siteId, startDate, endDate),
      devicesOverview: this.getSiteDevicesOverviewById(siteId, startDate, endDate),
      geoData: this.getSiteGeolocationDataById(siteId, startDate, endDate),
      siteHints: this.getSiteHintsById(siteId, startDate, endDate),
    }).pipe(
      map(result => {
        return result;
      })
    );
  }

}
