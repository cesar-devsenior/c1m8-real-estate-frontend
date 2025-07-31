import { Routes } from "@angular/router";

export const properties_route: Routes = [
    {
        path: "",
        loadComponent: () => import('./components/property-list/property-list').then(c => c.PropertyList)
    },
    {
        path: "new",
        loadComponent: () => import('./components/property-form/property-form').then(c => c.PropertyForm)
    },
    {
        path: "edit/:propertyId",
        loadComponent: () => import('./components/property-form/property-form').then(c => c.PropertyForm)
    },
    {
        path: ":propertyId",
        loadComponent: () => import('./components/property-detail/property-detail').then(c => c.PropertyDetail)
    }
];