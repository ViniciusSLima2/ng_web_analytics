import { NgOptimizedImage } from '@angular/common';
import { Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, fromEvent, map, throttleTime } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css'
})
export class SideBar {
  sideBarContainer: any = viewChild<ElementRef<HTMLDivElement>>('sideBarContainer');
  private router = inject(Router)
  private destroyRef = inject(DestroyRef);
  currentRoute = signal(this.router.url);
  routes = [
    {
      url: '/',
      label: 'Selecione o site'
    }
  ]
  
  constructor(){
    this.listenToNavigationEvents();
    this.listenToScrollEvent();
  }

  listenToNavigationEvents(){
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd), takeUntilDestroyed(this.destroyRef))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute.set(event.urlAfterRedirects);
    });
  }

  listenToScrollEvent(){

    fromEvent(window, 'scroll')
      .pipe(
        map(() => window.scrollY),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(scrollY => {
        this.sideBarContainer().nativeElement.style.transform = `translateY(${scrollY}px)`;
      });
  }
}
