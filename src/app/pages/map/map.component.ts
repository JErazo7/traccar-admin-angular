import { AfterViewInit, Component, Injectable } from '@angular/core';
import { TraccarService } from '../../services/traccar.service'
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  private map;

  constructor(protected traccarService: TraccarService) { }

  ngAfterViewInit(): void {
    this.initMap()
    
    
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [-0.2502212, -79.1638068],
      zoom: 17

    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }


}
