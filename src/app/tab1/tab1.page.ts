import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  // FormGroup定義
  public bodyWeightFormGroup: FormGroup;
  // 日付フォームのコントロール定義
  public dateControl: FormControl;
  // 体重フォームのコントロール定義
  public bodyWeightControl: FormControl;

  constructor(
    private fb: FormBuilder,
    private afStore: AngularFirestore,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
    this.initDate();
  }

  /**
   * 体重を設定する
   *
   * @memberof Tab1Page
   */
  public async registerBodyWeight(): Promise<void> {
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

    console.log(health);
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
}
