import { Routes } from '@angular/router';
import { authGuard } from './features/auth/guards/auth.guard';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "properties",
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.route').then(r => r.auth_route)
    },
    {
        path: 'properties',
        loadChildren: () => import('./features/properties/properties.route').then(r => r.properties_route),
        canActivate: [authGuard]
    }
];
