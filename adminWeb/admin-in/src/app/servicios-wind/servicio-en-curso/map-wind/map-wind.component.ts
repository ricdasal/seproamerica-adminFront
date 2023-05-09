import { Component, Inject, OnInit } from '@angular/core';
import {MapDirectionsService} from '@angular/google-maps';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-map-wind',
  templateUrl: './map-wind.component.html',
  styleUrls: ['./map-wind.component.css']
})
export class MapWindComponent implements OnInit {
  directionsResults$: Observable<google.maps.DirectionsResult | undefined>;

  constructor(
    mapDirectionsService: MapDirectionsService,
    @Inject(MAT_DIALOG_DATA) public pedido: any,
    public dialogRef: MatDialogRef<any>,
    
    
    ) {

    const request: google.maps.DirectionsRequest = {
      destination: {lat: this.pedido.destination_lat, lng: this.pedido.destination_lng}, //-2.1468681900820856, -79.88437406276634
      origin: {lat: this.pedido.origin_lat, lng: this.pedido.origin_lng},//-2.1758583229414237, -79.88188497287582
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsResults$ = mapDirectionsService.route(request)
    .pipe(map(response => response.result));
  }


  vertices: google.maps.LatLngLiteral[] = [
    {lat: 13, lng: 13},
    {lat: -13, lng: 0},
    {lat: 13, lng: -13},
  ];

  
  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;



  ngOnInit(): void {
  }

}
