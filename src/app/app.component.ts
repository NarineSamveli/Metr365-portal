import { Component, OnInit } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { GetDataService } from './get-data.service';

// just an interface for type safety.
// tslint:disable-next-line: class-name
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  information: string;
  color: string;
  radius: number;
  class: string;
  price_actual_date: string;
  rb_id: number;
  square: number;
  count: number;
  price_area: number;
  area: number;
  price: number;
  critical: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'Metr365-portal';
  markers: marker[];
  towns: marker[] = [];
  newMark: marker[] = [];
  zoom = 13; // google maps zoom level
  // initial center position for the map
  lat = 55.819990;
  lng = 37.430378;

  constructor(private mapsAPIWrapper: GoogleMapsAPIWrapper,
              private service: GetDataService){}

  ngOnInit() {
    this.service.getAll()
      .subscribe((datas: marker[]) => {
      this.markers = datas;
      this.towns = this.markers.filter(mark => mark.price_actual_date === '2020-08-21T21:00:00.000Z');
      this.towns.forEach( mark => {
        mark.draggable = true;
        mark.lat = +mark.lat;
        mark.lng = +mark.lng;
        mark.radius = Math.floor(((+mark.area / +mark.square) * 1000) * 100) / 100;
        if (mark.class === 'комфорт') {
            mark.color = 'DarkBlue';
          } else if (mark.class === 'эконом') {
            mark.color = 'Chartreuse';
          } else if (mark.class === 'бизнес') {
            mark.color = 'red';
          } else if (mark.class === 'элитный') {
            mark.color = 'DarkViolet';
          }
        this.newMark = this.markers.filter(newmark => newmark.rb_id === mark.rb_id);

        // tslint:disable-next-line: max-line-length
        mark.price_area = Math.floor(((+this.newMark[1].price_area - +this.newMark[0].price_area) / +this.newMark[0].price_area) * 100 * 100) / 100;
        mark.price = Math.floor(((+this.newMark[1].price - +this.newMark[0].price) / +this.newMark[0].price) * 100 * 100) / 100;
        mark.square = Math.floor(((+this.newMark[1].square - +this.newMark[0].square) / +this.newMark[0].square) * 100 * 100) / 100;
        mark.count = +this.newMark[1].count - +this.newMark[0].count;

        mark.information = mark.label;
        if ((+mark.price_area + +mark.price + +mark.square + +mark.count) === 0) { 
          mark.critical = true;
        }
      });
       console.log(this.towns)
    });
  }

  mapLoaded(event: Event) {
    // console.log('mapLoaded event called!');
    // this.mapsAPIWrapper.getNativeMap().then((map) => {
    //   console.log('Got map!');
    //   console.log(map);
    // });
  }

  clickedMarker(label: string, index: number) {
    // console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: $event.coords.draggable,
      information: $event.coords.information,
      color: $event.coords.color,
      radius: $event.coords.radius,
      class: $event.coords.class,
      price_actual_date: $event.coords.price_actual_date,
      rb_id: $event.coords.rb_id,
      square: $event.coords.square,
      count: $event.coords.count,
      price_area: $event.coords.price_area,
      area: $event.coords.area,
      price: $event.coords.price,
      critical: $event.coords.critical,
    });
  }

  markerDragEnd(m: marker, $event) {
    // console.log('dragEnd', m, $event);
  }
}




  // markers: marker[] = [
  //   {
  //     lat: 55.570657,
  //     lng: 37.486424,
  //     label: 'Аквилон Парк',
  //     draggable: true,
  //     information: 'Аквилон Парк',
  //     color: 'red',
  //     radius: 5000
  //   },
  //   {
  //     lat: 55.511221,
  //     lng: 37.351442,
  //     label: 'Кленовые аллеи',
  //     draggable: true,
  //     information: 'Кленовые аллеи',
  //     color: 'DarkViolet',
  //     radius: 3000
  //   },
  //   {
  //     lat: 55.822449,
  //     lng: 37.437190,
  //     label: 'Движение Тушино',
  //     draggable: true,
  //     information: 'Движение Тушино',
  //     color: 'DarkBlue',
  //     radius: 2000
  //   },
  //   {
  //     lat: 55.819990,
  //     lng: 37.430378,
  //     label: 'Город на Реке Тушино 2018',
  //     draggable: true,
  //     information: 'Город на Реке Тушино 2018',
  //     color: 'Chartreuse',
  //     radius: 5000
  //   }
  // ];