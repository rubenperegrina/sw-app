import { Component, OnInit } from '@angular/core';

import { ShipService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    ships = null;
    shipToFind: string;

    constructor(private shipService: ShipService) {}

    ngOnInit() {
        this.shipService.getCacheAll()
        .subscribe(
            (resp) => {
                if (typeof resp !== 'undefined' && resp.length > 0) {
                    this.ships = resp;
                }
                else {
                    this.shipService.getAll()
                    .subscribe(
                        (resp) => {this.ships = resp['results'];
                        this.getStarshipId();}
                    );
                }
            }
        );
    }

    getStarshipId() {
        for (var i = 0; i < this.ships.length; i++){
            var url = this.ships[i].url;
            this.ships[i].shipId = url.split("/").filter(function (item) {
                return item !== "";
            }).slice(-1)[0];
          }
          localStorage.setItem('time', JSON.stringify(new Date));

        this.cacheShips();
    }

    cacheShips() {
        this.shipService.saveShips(this.ships)
        .subscribe(
            (resp) => {}
        );
    }

    search(shipToFind:string) {
           const result = this.ships.find( ({ name }) => name === shipToFind );
          if (result) {
              this.ships = [];
              this.ships.push(result);
          } else if (shipToFind === '') {
            this.shipService.getCacheAll()
            .subscribe(
                (resp) => {this.ships = resp;}
            );
          }
        }
}