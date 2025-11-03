import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Analytics } from '../services/analytics';
import { forkJoin, map } from 'rxjs';
import { Referrers, SiteMetadata, Timeseries, TopPage } from '../models/siteMetadata.model';


export const siteDataResolver: ResolveFn<{
  timeseries: Timeseries,
  referrers: Referrers,
  metadata: SiteMetadata
}> = (route, state) => {
  const analyticsService = inject(Analytics);
  const siteId = route.paramMap.get('id') || '';
  return forkJoin({
    timeseries: analyticsService.getSiteAnalyticsTimeseriesById(siteId),
    referrers: analyticsService.getSiteAnalyticsReferrersById(siteId),
    metadata: analyticsService.getSiteMetadataById(siteId),
    engagement: analyticsService.getSiteEngagementMetricsById(siteId),
    pagesOverview: analyticsService.getSitePagesOverviewById(siteId),
    devicesOverview: analyticsService.getSiteDevicesOverviewById(siteId),
    geoData: analyticsService.getSiteGeolocationDataById(siteId),
    siteHints: analyticsService.getSiteHintsById(siteId),
  }).pipe(
    map(result => {
      return {
        ...result,
        siteId: siteId
      };
    })
  );
};
