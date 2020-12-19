import { Component, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  @ViewChild('lineChart') lineChart;

  bars: any;
  colorArray: any;
  constructor() { }

  ionViewDidEnter() {
    this.createBarChart();
  }

  createBarChart() {
    this.bars = new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['12/11', '12/12', '12/13', '12/14', '12/15', '12/16', '12/17'],
        datasets: [{
          label: '体重 kg',
          data: [74.3, 75.0, 74.6, 75.0, 74.3, 74.6, 75.2],
          lineTension: 0, // 曲線ではなく直線にする
          fill: false, // グラフの背景色を消す
          borderColor: 'rgb(38, 194, 129)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true, // レスポンシブ
        maintainAspectRatio: false, // サイズ変更の際に、元のキャンバスのアスペクト比を維持しない
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    });
  }
}
