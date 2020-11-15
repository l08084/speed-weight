import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  /**
   * 体重を設定する
   *
   * @memberof Tab1Page
   */
  public registerBodyWeight(): void {
    console.log('register');
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
  }
}
