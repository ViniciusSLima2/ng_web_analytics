export interface SiteMetadata {
    name: string;
    domain: string;
    id: string;
}

export interface Timeseries {
  id: number;
  siteId: string;
  date: Date;
  visits: number;
}

export interface TopPage {
  id: number;
  siteId: string;
  page: string;
  views: number;
}

export interface Referrers {
  id: number;
  siteId: string;
  source: string;
  visits: number;
}