import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShipService } from '@app/_services';
import { Ship } from '@app/_models';

@Component({ templateUrl: 'detail.component.html' })
export class DetailComponent implements OnInit {
    id: string;
    ship: Ship = {
        shipId: 0,
        name: '',
        manufacturer: '',
        consumables: '',
        model: '',
        starship_class: '',
        passengers: '',
        crew: '',
        max_atmosphering_speed: '',
        hyperdrive_rating: '',
    };
    ships = null;

    constructor(
        private route: ActivatedRoute,
        private shipService: ShipService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        
         this.shipService.getCacheAll()
            .subscribe(
                (resp) => {this.ships = resp;
                    for (var i = 0; i < this.ships.length; i++){
                        if (this.ships[i].shipId == this.id){
                            this.ship = this.ships[i];
                        }
                      }
                }
            );
    }
}