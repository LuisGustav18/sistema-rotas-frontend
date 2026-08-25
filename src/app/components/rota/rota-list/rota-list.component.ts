import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import * as leaflet from 'leaflet';

@Component({
  selector: 'app-rota-list',
  imports: [
    CommonModule
  ],
  templateUrl: './rota-list.component.html',
  styleUrl: './rota-list.component.scss',
})
export class RotaListComponent {
  @ViewChild('mapContainer',
    { static: true })

  mapContainer!: ElementRef;
  private map!: leaflet.Map;

  listaVazia: boolean = true;

  ngOnInit(): void {
    this.InitMap();
  }

  private InitMap(): void {
    const iconDefault = leaflet.icon({
      iconRetinaUrl: 'leaflet/marker-icon-2x.png',
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    leaflet.Marker.prototype.options.icon = iconDefault;

    this.map = leaflet.map(this.mapContainer.nativeElement).setView(
      [-14.2350, -51.9253],
      6
    );

    leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 100)
  }


}
