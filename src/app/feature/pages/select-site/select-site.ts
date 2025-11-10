import { Component, inject, signal } from '@angular/core';
import { Analytics } from '../../../core/services/analytics';
import { SiteCard } from './components/site-card/site-card';
import { SiteMetadata } from '../../../core/models/siteMetadata.model';
import { finalize } from 'rxjs';
import { SkeletonCards } from "./components/skeleton-cards/skeleton-cards";

@Component({
  selector: 'app-select-site',
  imports: [SiteCard, SkeletonCards],
  templateUrl: './select-site.html',
  styleUrl: './select-site.css'
})
export class SelectSite {
  protected sitesMetadata = signal<Array<SiteMetadata>>([]);
  analyticsService = inject(Analytics);
  isDataLoading = signal(true);
  ngOnInit(){
    this.getAllSitesMetadata();
  }

  getAllSitesMetadata(){
    this.analyticsService.getSitesMetadata()
    .pipe(finalize(() => this.isDataLoading.set(false)))
    .subscribe((data) => {
      this.sitesMetadata.set(data);
    });
  }
}
