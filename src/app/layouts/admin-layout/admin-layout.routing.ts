import { Routes } from '@angular/router';

import { MapsComponent } from '../../pages/maps/maps.component';

export const AdminLayoutRoutes: Routes = [   

    { path: 'maps',  pathMatch: 'full',         component: MapsComponent },
    {path: '**', redirectTo: 'maps'}
    
];
