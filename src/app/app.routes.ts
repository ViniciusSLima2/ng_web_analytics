import { Routes } from '@angular/router';
import { DashboardLayout } from './shared/components/dashboard-layout/dashboard-layout';
import { siteDataResolver } from './core/resolvers/site-data-resolver';

export const routes: Routes = [
    {
        path: '',
        component: DashboardLayout,
        children: [
            {
                path: '',
                loadComponent: () => import('./feature/pages/select-site/select-site').then(m => m.SelectSite),
            },
            {
                path: 'dashboard/:id',
                loadComponent: () => import('./feature/pages/site-dashboard/site-dashboard').then(m => m.SiteDashboard),
                resolve: {
                    data: siteDataResolver
                }
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
