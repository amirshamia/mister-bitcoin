import { Component, Input } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';

@Component({
    selector: 'line-chart',
    templateUrl: './line-chart.component.html',
    // styleUrl: './line-chart.component.scss'
})
export class LineChartComponent {

    @Input() lineChartData!: ChartConfiguration['data']


    public lineChartOptions: ChartConfiguration['options'] = {
        elements: {
            line: {
                tension: 0.5,
            },
        },
        scales: {
            y: {
                position: 'left',
            },
            y1: {
                position: 'right',
                grid: {
                    color: 'rgba(255,0,0,0.3)',
                },
                ticks: {
                    color: 'red',
                },
            },
        },
       
    };

    public lineChartType: ChartType = 'line';
}
