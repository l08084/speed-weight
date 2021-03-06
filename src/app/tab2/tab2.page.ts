import { Component, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { AuthenticationService } from '../services/authentication.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Health } from '../models/health';
import { DateLabelService } from '../services/date-label.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

const Period = {
  Week: 'week',
  Month: 'month',
  ThreeMonth: 'threeMonth',
  Year: 'year',
  ThreeYear: 'threeYear',
} as const;
export type Period = typeof Period[keyof typeof Period];
// TODO: 体重計グラフアプリの問題点
// TODO: 問題点1: グラフの外側の体重データと線をつなげる必要がある
// TODO: 問題点1の対応: 諦める
// TODO: 問題点2: 例えば、１週間を指定した場合に、今週のデータではなく、体重が設定されている日付のデータを表示する必要がある
// TODO: 問題点2の対応: 対応する
// TODO: 問題点3: 1週間以外の期間の場合、どうするか
// TODO: 問題点3の対応: なるべく、縦線をふやす。収まらない場合は平均を使用する
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
  private myHealthCollection: AngularFirestoreCollection<Health>;
  private myHealths: Health[] = [];
  private dateLabelList: string[];
  private bodyWeightDateList: string[];
  private chartData: number[];
  private baseDateLabel: string;

  constructor(
    private authenticationService: AuthenticationService,
    private spinnerService: SpinnerService,
    private afStore: AngularFirestore,
    private dateLabelService: DateLabelService
  ) {}

  public ionViewDidEnter() {
    this.getHealths();
  }

  /**
   * グラフを新規作成する。
   *
   * @memberof Tab2Page
   */
  public createBarChart() {
    this.bars = new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: [...this.dateLabelList],
        datasets: [
          {
            label: '体重 kg',
            data: [...this.chartData],
            lineTension: 0, // 曲線ではなく直線にする
            fill: false, // グラフの背景色を消す
            borderColor: 'rgb(56, 128, 255)',
            borderWidth: 1,
            spanGaps: true, // データにnullがあったとしても、線を補間表示する
          },
        ],
      },
      options: {
        responsive: true, // レスポンシブ
        maintainAspectRatio: false, // サイズ変更の際に、元のキャンバスのアスペクト比を維持しない
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
              },
            },
          ],
        },
      },
    });
  }

  /**
   * 期間タブをクリックする
   *
   * @param {Period} period
   * @memberof Tab2Page
   */
  public clickPeriodTab(period: Period) {
    this.selectedPeriodTab = period;
    this.updateChart();
  }

  private updateChart() {}

  /**
   * FirestoreからHealthデータを取得する
   *
   * @private
   * @memberof Tab1Page
   */
  private async getHealths(): Promise<void> {
    const user = await this.authenticationService.getCurrentUser();
    // ログインユーザーの全Healthデータを取得する
    this.myHealthCollection = this.afStore.collection('health', (ref) =>
      ref.orderBy('createdDate', 'desc').where('createdUser', '==', user.uid)
    );

    this.myHealthCollection.valueChanges().subscribe((myHealths) => {
      this.spinnerService.show();
      this.myHealths = myHealths;
      if (this.myHealths.length > 0) {
        this.createBaseDateLabel();
        this.createDateLabelList();
        this.createBodyWeightParam();
        this.retrieveBodyWeight();
        this.createBarChart();
      }
      this.spinnerService.hide();
    });
  }

  private createBaseDateLabel() {
    this.baseDateLabel = this.dateLabelService.createBaseDateLabel(this.myHealths);
  }

  /**
   * グラフの日付ラベルのリストを作成する
   *
   * @private
   * @memberof Tab2Page
   */
  private createDateLabelList() {
    this.dateLabelList = this.dateLabelService.createDateLabelList(
      this.baseDateLabel,
      this.selectedPeriodTab
    );
  }

  /**
   * 体重データを取得する引数となる日付文字列を作成する
   *
   * @private
   * @memberof Tab2Page
   */
  private createBodyWeightParam() {
    this.bodyWeightDateList = this.dateLabelService.createBodyWeightParam(
      this.baseDateLabel,
      this.selectedPeriodTab
    );
  }

  /**
   * グラフに表示する体重データを取得する
   *
   * @private
   * @memberof Tab2Page
   */
  private retrieveBodyWeight() {
    // グラフで表示する用の体重データを取得
    this.chartData = this.bodyWeightDateList.map((date) => {
      const health = this.myHealths.find((item) => item.date === date);
      return health ? health.weight : undefined;
    });
  }
}
