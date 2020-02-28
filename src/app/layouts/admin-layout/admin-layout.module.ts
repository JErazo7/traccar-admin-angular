import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { MapComponent } from '../../pages/map/map.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {TraccarService} from '../../services/traccar.service';
import {MarkerService} from '../../services/marker.service'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    TraccarService,
    MarkerService
  ],
  declarations: [
    MapComponent,
  ]
})

export class AdminLayoutModule {}
