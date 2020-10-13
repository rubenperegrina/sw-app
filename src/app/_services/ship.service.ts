import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Ship } from '@app/_models';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class ShipService {

    constructor(
        private http: HttpClient
    ) {
    }

    getAll() {
        var url  ='https://swapi.dev/api/starships/';
        return this.http.get(url,{
            headers: {
                'Authorization': 'none'        
            }
        })    
    }

    saveShips(ship: Ship) {
        return this.http.post(`${environment.apiUrl}/ships/save`, ship);
    }

    getCacheAll() {
        return this.http.get<Ship[]>(`${environment.apiUrl}/ships`);
    }
}