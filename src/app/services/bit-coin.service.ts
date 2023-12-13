import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, retry, switchMap } from 'rxjs/operators';
import { Observable, interval, throwError, timer } from 'rxjs';
import { MarketPlace } from '../models/bit-coin';
import { JsonPipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class BitCoinService {
    constructor(private http: HttpClient) { }


    public getBitCoinRateStream(val?: number): Observable<string> {
        return timer(0, 1000 * 60 * 5).pipe(
            switchMap(() => this.getBitCoinRate(val))
        )
    }

    public getBitCoinRate(val?: number): Observable<string> {
        return this.http.get<string>('https://blockchain.info/tobtc?currency=USD&value=1')
            .pipe(
                retry(1),
                catchError((err: HttpErrorResponse) => {
                    console.log('err:', err);
                    return throwError(() => err);
                })
            );
    }

    public getMarketPlace(): Observable<MarketPlace> {
        return this.http.get<MarketPlace>('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
            .pipe(
                retry(1),
                catchError((err: HttpErrorResponse) => {
                    console.log('err:', err);
                    return throwError(() => err);
                })
            );
    }
}



// https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true