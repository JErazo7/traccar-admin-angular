import { Routes } from '@angular/router';

import { MapComponent } from '../../pages/map/map.component';

export const AdminLayoutRoutes: Routes = [   

    { path: 'map',  pathMatch: 'full', component: MapComponent },
    {path: '**', redirectTo: 'map'}
    
];
