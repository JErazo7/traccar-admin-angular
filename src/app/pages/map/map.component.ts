import { AfterViewInit, Component, Injectable, OnInit } from '@angular/core';
import { TraccarService } from '../../services/traccar.service'
import * as L from 'leaflet';
import { filter, map } from 'rxjs/operators';
import { Position } from 'app/models/position';

interface MarkerPosition {
  name: string;
  marker: L.Marker
}



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnInit {

  private map;

  private readonly markers: { [deviceId: string]: MarkerPosition } = {};

  constructor(protected traccarService: TraccarService) { }

  ngOnInit(): void {
    this.initMap()
  }
  ngAfterViewInit(): void {



    this.traccarService.getPositions.asObservable()
      .pipe(
        filter(response => 'devices' in response),
        map(response => response['devices'])
      )
      .subscribe(devices => {
        devices.forEach(p => {
          if (!(p.id in this.markers)) {
            this.markers[p.id] = { name: p.name, marker: L.marker([0, 0]).bindPopup('Desconectado').addTo(this.map) };
          }
          this.markers[p.id].name = p.name;
          this.traccarService.getPositions.asObservable()
            .pipe(
              filter(response => 'positions' in response),
              map(response => response['positions'])
            )
            .subscribe(positions => {
              positions.forEach(p => {
                if (p.deviceId in this.markers) {
                  this.markers[p.deviceId].marker.setLatLng(L.latLng(p.latitude, p.longitude));
                }
              });
            }, error => {
              console.log('Ha fallado la conexion para obtener posiciones')
            })
          if (this.markers[p.id].marker !== null && p.status !== 'unknown') {
            this.markers[p.id].marker._popup.setContent(p.name);
          } else {
            this.markers[p.id].marker._popup.setContent('Desconectado');
          }
        });
      }, error => {
        console.log('Ha fallado la conexion para obtener dispositivos')
      })

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
