import { Injectable } from '@angular/core';
import { Period } from '../tab2/tab2.page';
import * as dayjs from 'dayjs';

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
  public createDateLabelList(periodValue: Period): string[] {
    switch (periodValue) {
      case 'week':
        return this.createWeekDateLabel();
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
  private createWeekDateLabel(): string[] {
    const weekDateLabel = [];
    const now = dayjs();
    weekDateLabel.push(now.format('MM/DD'));
    let day = now;
    for (let i = 0; i < 6; i++) {
      day = day.subtract(1, 'day');
      weekDateLabel.push(day.format('MM/DD'));
    }
    return weekDateLabel.reverse();
  }
}
