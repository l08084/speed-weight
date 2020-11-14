import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
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
   * フォーム設定の作成
   *
   */
  private createForm() {
    this.bodyWeightFormGroup = this.fb.group(
      {
        date: ['', []],
        bodyWeight: ['', []]
      }
    );
  }
}
