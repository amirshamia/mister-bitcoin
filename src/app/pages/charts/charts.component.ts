import { Component, inject } from '@angular/core';
import { BitCoinService } from '../../services/bit-coin.service';
import { map, Subscription } from 'rxjs';

@Component({
    selector: 'charts',
    templateUrl: './charts.component.html',
    styleUrl: './charts.component.scss'
})
export class ChartsComponent {
    bitCoinService = inject(BitCoinService)
    subscription!: Subscription
    lineChartData$ = this.bitCoinService.getMarketPlace().pipe(
        map(data => {
            return {
                datasets: [{
                    data: data.values.map((item: any) => item.y),
                    label: 'Market Price (USD)',
                    fill: true,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }],
                labels: data.values.map((item: any) => new Date(item.x * 1000).toLocaleDateString('he'))
            }
        })
    )



}
