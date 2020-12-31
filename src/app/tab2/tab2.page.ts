import { Component, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';

const Period = {
  Week: 'week',
  Month: 'month',
  ThreeMonth: 'threeMonth',
  Year: 'year',
  ThreeYear: 'threeYear'
} as const;
type Period = typeof Period[keyof typeof Period];

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  @ViewChild('lineChart') lineChart;

  public bars: any;
  public colorArray: any;
  public selectedPeriodTab: Period = 'week';

  constructor() { }

  public ionViewDidEnter() {
    this.createBarChart();
  }

  public createBarChart() {
    this.bars = new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['12/11', '12/12', '12/13', '12/14', '12/15', '12/16', '12/17'],
        datasets: [{
          label: '体重 kg',
          data: [74.3, 75.0, 74.6, 75.0, 74.3, 74.6, 75.2],
          lineTension: 0, // 曲線ではなく直線にする
          fill: false, // グラフの背景色を消す
          borderColor: 'rgb(56, 128, 255)',
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

  /**
   * 期間タブをクリックする
   *
   * @param {Period} period
   * @memberof Tab2Page
   */
  public clickPeriodTab(period: Period) {
    console.log(period);
    this.selectedPeriodTab = period;
  }
}
