import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import * as leaflet from 'leaflet';
import { RotaService } from '../../../services/rota.service';
import { ProjetoService } from '../../../services/projeto.service';
import { Projeto } from '../../../model/projeto';
import { Rota } from '../../../model/rota';
import { UUIDTypes } from 'uuid';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RotaCreateComponent } from '../rota-create/rota-create.component';
import { RotaUpdateComponent } from '../rota-update/rota-update.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { RotaDeleteComponent } from '../rota-delete/rota-delete.component';

@Component({
  selector: 'app-rota-list',
  imports: [
    DialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule,
    MatIcon
  ],
  templateUrl: './rota-list.component.html',
  styleUrl: './rota-list.component.scss',
})
export class RotaListComponent {
  @ViewChild('mapContainer',
    { static: true })

  mapContainer!: ElementRef;
  private map!: leaflet.Map;
  private marcadores = leaflet.layerGroup();
  private rotasMapa = leaflet.layerGroup();

  listagemVazia: boolean = true;

  projeto: Projeto | null = null;
  rotas: Rota[] = [];

  constructor(
    private service: RotaService,
    private route: ActivatedRoute,
    private projetoService: ProjetoService,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.findByIdProjeto(id);
    }
    this.InitMap();
  }

  private findByIdProjeto(id: UUIDTypes) {
    this.projetoService.findById(id).subscribe({
      next: (resposta) => {
        this.projeto = resposta;
        if (this.projeto.id) {
          this.findById(id)
        }
        this.cd.detectChanges();
      }
    })
  }

  public findById(id: UUIDTypes) {
    this.service.findByIdProjeto(id).subscribe({
      next: (resposta) => {
        this.rotas = resposta;
        if (this.rotas.length > 0) {
          this.listagemVazia = false;
        }

        this.marcarRotas();
        this.desenharRotas();
        this.cd.detectChanges();
      }
    })
  }

  private create(longitude: number, latitude: number) {
    this.dialog.open(RotaCreateComponent, {
      data: {
        longitude: longitude,
        latitude: latitude,
        id: this.projeto?.id
      },
      autoFocus: false
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.findByIdSimplified();
    })
  }

  public delete(rota: Rota) {
    this.dialog.open(RotaDeleteComponent, {
      data: {
        id: rota.id
      },
      autoFocus: false
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.findByIdSimplified();
    })
  }

  public update(rota: Rota) {
    this.dialog.open(RotaUpdateComponent, {
      data: {
        rota: rota,
        autoFocus: false
      }
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.findByIdSimplified();
    })
  }

  private findByIdSimplified() {
    if (this.projeto?.id) {
      this.findById(this.projeto.id)
      this.cd.detectChanges();
    }
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

    this.map.on('click', (evento) => {
      const latitude = evento.latlng.lat;
      const longitude = evento.latlng.lng;

      this.create(longitude, latitude);
    })

    setTimeout(() => {
      this.map.invalidateSize();
    }, 100)

    this.marcadores.addTo(this.map);
    this.rotasMapa.addTo(this.map);
  }

  private marcarRotas(): void {

    this.marcadores.clearLayers();

    this.rotas.forEach((rota, i) => {

      const icone = leaflet.divIcon({
        className: 'marcador-rota',
        html: `
        <div class="ponteiro">
          <span>${i + 1}</span>
        </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
      });

      leaflet.marker(
        [rota.latitude, rota.longitude],
        { icon: icone }
      ).addTo(this.map)
        .bindPopup(
          `<strong>${rota.titulo || 'Sem título'}<strong>`
        )
        .addTo(this.marcadores);
    })
  }

  private desenharRotas(): void {
    this.rotasMapa.clearLayers();

    if (this.rotas.length < 2) {
      return;
    }

    for (let i = 0; i < this.rotas.length - 1; i++) {

      const origem = this.rotas[i];
      const destino = this.rotas[i + 1];

      const cordenadas =
        `${origem.longitude},${origem.latitude};` +
        `${destino.longitude},${destino.latitude}`;

      const url = `https://router.project-osrm.org/route/v1/driving/${cordenadas}` +
        `?overview=full&geometries=geojson`;

      fetch(url)
        .then(async resposta => {

          const dados = await resposta.json();

          if (dados.code === 'Ok' && dados.routes?.length > 0 && resposta.ok) {
            const geometria = dados.routes[0].geometry;

            leaflet.geoJSON(geometria, {
              style: {
                color: '#78b889',
                weight: 8
              }
            }).addTo(this.rotasMapa);

          } else {
            this.desenharLinhaDireta(origem, destino);
          }
        })
        .catch(() => {
          this.desenharLinhaDireta(origem, destino);
        });
    }
  }

  private desenharLinhaDireta(origem: Rota, destino: Rota): void {
    leaflet.polyline(
      [
        [origem.latitude, origem.longitude],
        [destino.latitude, destino.longitude]
      ],
      {
        color: '#78b889',
        weight: 8,
      }
    ).addTo(this.rotasMapa);
  }
}
