import { Injectable } from '@angular/core';
import { Period } from '../tab2/tab2.page';
import * as dayjs from 'dayjs';
import { Health } from '../models/health';

/**
 * グラフの日付文字列ラベルを作成する
 *
 * @export
 * @class DateLabelService
 */
@Injectable({
  providedIn: 'root',
})
export class DateLabelService {
  constructor() {}

  /**
   * グラフの日付ラベルのリストを作成する
   *
   * @param {Period} periodValue
   * @memberof DateLabelService
   */
  public createDateLabelList(
    baseDateLabel: string,
    periodValue: Period
  ): string[] {
    switch (periodValue) {
      case 'week':
        return this.createWeekDateLabel(baseDateLabel);
      case 'month':
        console.log('month');
        break;
      case 'threeMonth':
        console.log('threeMonth');
        break;
      case 'year':
        console.log('year');
        break;
      case 'threeYear':
        console.log('threeYear');
        break;
    }
  }

  /**
   * 1週間分の日付ラベルを作成する
   *
   * @private
   * @returns {string[]}
   * @memberof DateLabelService
   */
  private createWeekDateLabel(baseDateLabel: string): string[] {
    const weekDateLabel = [];
    const baseDate = dayjs(baseDateLabel);
    weekDateLabel.push(baseDate.format('MM/DD'));
    let day = baseDate;
    for (let i = 0; i < 6; i++) {
      day = day.subtract(1, 'day');
      weekDateLabel.push(day.format('MM/DD'));
    }
    return weekDateLabel.reverse();
  }

  /**
   * 体重データの引数である日付文字列(YYYY-MM-DD)を作成する
   *
   * @private
   * @param {Period} periodValue
   * @returns {string[]}
   * @memberof DateLabelService
   */
  public createBodyWeightParam(
    baseDateLabel: string,
    periodValue: Period
  ): string[] {
    switch (periodValue) {
      case 'week':
        return this.createWeekWeightBodyParam(baseDateLabel);
      case 'month':
        console.log('month');
        break;
      case 'threeMonth':
        console.log('threeMonth');
        break;
      case 'year':
        console.log('year');
        break;
      case 'threeYear':
        console.log('threeYear');
        break;
    }
  }

  /**
   * 1週間分の体重データを取得する日付文字列を作成する
   *
   * @private
   * @returns {string[]}
   * @memberof DateLabelService
   */
  private createWeekWeightBodyParam(baseDateLabel: string): string[] {
    const weekDateLabel = [];
    const baseDate = dayjs(baseDateLabel);
    weekDateLabel.push(baseDate.format('YYYY-MM-DD'));
    let day = baseDate;
    for (let i = 0; i < 6; i++) {
      day = day.subtract(1, 'day');
      weekDateLabel.push(day.format('YYYY-MM-DD'));
    }
    return weekDateLabel.reverse();
  }

  public createBaseDateLabel(myHealths: Health[]): string {
    return dayjs(
      Math.max(...myHealths.map((healsh) => dayjs(healsh.date).valueOf()))
    ).format('YYYY-MM-DD');
  }
}
