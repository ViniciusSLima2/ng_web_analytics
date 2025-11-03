import { Component, inject, signal } from '@angular/core';
import { Analytics } from '../../../core/services/analytics';
import { SiteCard } from './components/site-card/site-card';
import { SiteMetadata } from '../../../core/models/siteMetadata.model';

@Component({
  selector: 'app-select-site',
  imports: [SiteCard],
  templateUrl: './select-site.html',
  styleUrl: './select-site.css'
})
export class SelectSite {
  protected sitesMetadata = signal<Array<SiteMetadata>>([]);
  analyticsService = inject(Analytics);

  ngOnInit(){
    this.getAllSitesMetadata();
  }

  getAllSitesMetadata(){
    this.analyticsService.getSitesMetadata().subscribe((data) => {
      this.sitesMetadata.set(data);
    });
  }
}
