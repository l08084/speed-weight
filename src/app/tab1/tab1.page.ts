import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as dayjs from 'dayjs';
import { firestore } from 'firebase';
import { Health } from '../models/health';
import { AuthenticationService } from '../services/authentication.service';
import { SpinnerService } from '../services/spinner.service';

/**
 * 体重入力画面
 *
 * @export
 * @class Tab1Page
 * @implements {OnInit}
 */
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  // FormGroup定義
  public bodyWeightFormGroup: FormGroup;
  // 日付フォームのコントロール定義
  public dateControl: FormControl;
  // 体重フォームのコントロール定義
  public bodyWeightControl: FormControl;
  private myHealthCollection: AngularFirestoreCollection<Health>;
  private myHealths: Health[] = [];

  constructor(
    private fb: FormBuilder,
    private afStore: AngularFirestore,
    private authenticationService: AuthenticationService,
    private spinnerService: SpinnerService
  ) {}

  public ngOnInit() {
    this.createForm();
    this.initDate();
    this.getHealths();

    // 日付を変更すると、体重項目の値を更新する
    this.dateControl.valueChanges.subscribe(() => {
      this.initBodyWeight();
    });
  }

  /**
   * 体重の新規登録または更新をする
   *
   * @memberof Tab1Page
   */
  public upsertBodyWeight(): void {
    // 同一日付のHealthデータがあるか検索する
    const found = this.getSameDayBodyWeight();
    if (!found) {
      this.registerBodyWeight();
    } else {
      this.updateBodyWeight(found);
    }
  }

  /**
   * 体重を新規登録する
   *
   * @memberof Tab1Page
   */
  private async registerBodyWeight(): Promise<void> {
    this.spinnerService.show();

    try {
      // ログインしているユーザ情報の取得
      const user = await this.authenticationService.getCurrentUser();

      const health: Health = {
        id: '',
        date: dayjs(this.dateControl.value).format('YYYY-MM-DD'),
        weight: this.bodyWeightControl.value as number,
        createdUser: user.uid,
        createdDate: firestore.FieldValue.serverTimestamp(),
        updatedDate: firestore.FieldValue.serverTimestamp(),
      };
      const docRef = await this.afStore.collection('health').add(health);

      await this.myHealthCollection.doc(docRef.id).update({
        id: docRef.id,
      });
    } catch (err) {
      console.error(err);
    } finally {
      this.spinnerService.hide();
    }
  }

  /**
   * 体重の更新
   *
   * @private
   * @param {Health} beforeHealth
   * @returns {Promise<void>}
   * @memberof Tab1Page
   */
  private async updateBodyWeight(beforeHealth: Health): Promise<void> {
    this.spinnerService.show();

    try {
      await this.myHealthCollection.doc(beforeHealth.id).update({
        weight: this.bodyWeightControl.value as number,
        updatedDate: firestore.FieldValue.serverTimestamp(),
      });
    } catch (err) {
      console.error(err);
    } finally {
      this.spinnerService.hide();
    }
  }

  /**
   * 画面の初期表示時に
   * datepickerに当日の日付を設定する
   *
   * @private
   * @memberof Tab1Page
   */
  private initDate(): void {
    this.dateControl.setValue(dayjs().format());
  }

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
      this.initBodyWeight();
      this.spinnerService.hide();
    });
  }

  /**
   * フォーム設定の作成
   *
   * @private
   * @memberof Tab1Page
   */
  private createForm() {
    this.bodyWeightFormGroup = this.fb.group({
      date: ['', [Validators.required]],
      bodyWeight: [
        '',
        [Validators.required, Validators.min(0), Validators.max(999)],
      ],
    });

    this.dateControl = this.bodyWeightFormGroup.get('date') as FormControl;
    this.bodyWeightControl = this.bodyWeightFormGroup.get(
      'bodyWeight'
    ) as FormControl;
  }

  /**
   * 体重項目にその日の体重をセットする
   *
   * @private
   * @memberof Tab1Page
   */
  private initBodyWeight() {
    // 同一日付のHealthデータがあるか検索する
    const found = this.getSameDayBodyWeight();
    if (found) {
      this.bodyWeightControl.setValue(found.weight);
    } else {
      this.bodyWeightControl.setValue(undefined);
    }
  }

  /**
   * ピッカーと同一日付の体重を取得して、
   * 項目にセットする
   *
   * @private
   * @returns {Health}
   * @memberof Tab1Page
   */
  private getSameDayBodyWeight(): Health {
    return this.myHealths.find(
      (item) => item.date === dayjs(this.dateControl.value).format('YYYY-MM-DD')
    );
  }
}
