import { Component, input } from '@angular/core';
import { SiteMetadata } from '../../../../../core/models/siteMetadata.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-card',
  imports: [RouterLink],
  templateUrl: './site-card.html',
  styleUrl: './site-card.css'
})
export class SiteCard {
  siteData = input.required<SiteMetadata>();
}
