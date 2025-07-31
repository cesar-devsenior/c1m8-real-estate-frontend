import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "properties",
        pathMatch: 'full'
    },
    {
        path: 'properties',
        loadChildren: () => import('./features/properties/properties.route').then(r => r.properties_route)
    }
];
