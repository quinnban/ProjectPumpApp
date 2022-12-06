/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/ban-types */
import { Component, forwardRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Item } from '../../models/item.model';
import { SelectItemsModalComponent } from '../select-items-modal/select-items-modal.component';

@Component({
  selector: 'app-item-selector',
  templateUrl: './item-selector.component.html',
  styleUrls: ['./item-selector.component.scss'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItemSelectorComponent ),
      multi: true
    },
  ],
})
export class ItemSelectorComponent implements OnInit, OnDestroy {

  @Input() title: string;
  @Input() itemList: Readonly<Item []>;
  selectedItemsArray: FormArray;
  selectedItemsForm: FormGroup;
  subscription: Subscription [] = [];
  private onTouched: () => {};
  constructor(private modalCtrl: ModalController,private formBuilder: FormBuilder) { }

  @HostListener('blur')
  handleBlur(){
    if(this.onTouched){
      this.onTouched();
    }
  }

  registerOnChange(fn: any): void {
    this.subscription.push(this.selectedItemsArray.valueChanges.subscribe(val => fn(val)));
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    if(!!value && value.length !==0){
      value.forEach(item => {
        if(this.selectedItemsArray.length < value.length){
          this.addItem();
        }
      });
      this.selectedItemsArray.patchValue(value);
    } else {
      setTimeout(()=> this.selectedItemsArray.reset(),0);
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  ngOnInit() {
    this.selectedItemsArray = this.createItemArray();
    this.selectedItemsForm = this.createItemForm();
  }

  async openModal(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: SelectItemsModalComponent,
      componentProps: {
        orginialItems: this.itemList,
        selectedItems: this.itemList.filter(i => this.selectedItemsArray.value?.map(it => it.id).includes(i.id))
      }
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    console.log(data);
    // this.patchItems(data.items);
  }

  private patchItems(items: Item []){
    if(this.selectedItemsArray.length > items.length){
      const dif = Math.abs(this.selectedItemsArray.length - items.length);
      for(let i = 0; i < dif; i++){
        this.selectedItemsArray.removeAt(0);
      }
    } else if(this.selectedItemsArray.length < items.length) {
      const dif = Math.abs(this.selectedItemsArray.length - items.length);
      for(let i = 0; i < dif; i++){
        this.addItem();
      }
    }
    this.selectedItemsArray.patchValue(items);
  }

  private addItem(): void {
    this.selectedItemsArray.push(this.createItem());
  }

  private createItemArray(): FormArray{
    return this.formBuilder.array([]);
  }

  private createItemForm(): FormGroup {
    return this.formBuilder.group({
      items: this.itemList
    });
  }

  private createItem(): FormGroup{
    return  this.formBuilder.group({
      id: [null],
      name: [null]
    });
  }

}
