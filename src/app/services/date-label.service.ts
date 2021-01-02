import { Injectable } from '@angular/core';
import { Period } from '../tab2/tab2.page';

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

  private createWeekDateLabel(): string[] {
    return [];
  }
}
