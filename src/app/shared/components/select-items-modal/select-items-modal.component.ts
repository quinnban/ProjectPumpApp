/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { debounceTime } from 'rxjs/operators';
import { Iteam } from '../../models/item.model';


@Component({
  selector: 'app-select-items-modal',
  templateUrl: './select-items-modal.component.html',
  styleUrls: ['./select-items-modal.component.scss'],
})
export class SelectItemsModalComponent implements OnInit {
  orginialItems: Readonly <Array<Iteam>>;
  selectedItems: Array<Iteam>;
  filteredItems: Array<Iteam>;

  searchString= new FormControl('');


  constructor(private modalCtrl: ModalController,) { }

  ngOnInit() {
    this.filteredItems = (this.uniqBy([... this.selectedItems,...this.orginialItems],JSON.stringify));
    this.searchString.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      this.filteredItems = this.uniqBy([... this.selectedItems,...this.orginialItems.filter(item => item.name.includes(value))],JSON.stringify);
    });
  }

  itemClicked(item): void {
    if(this.isItemSelected(item)){
      this.selectedItems = this.selectedItems.filter(i => i.id!== item.id);
      return;
    }
    this.selectedItems.push(item);
  }
  isItemSelected(item): boolean{
    return this.selectedItems.includes(item);
  }

  cancel(): void {
    this.modalCtrl.dismiss(null, 'cancel');
 }

 confirm(): void {
    this.modalCtrl.dismiss( this.selectedItems.map(i => i.id),'confirm');
 }


  private uniqBy(a, key) {
    const seen = new Set();
    return a.filter(item => {
        const k = key(item);
        return seen.has(k) ? false : seen.add(k);
    });
}




}
