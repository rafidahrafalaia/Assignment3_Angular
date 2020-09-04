import { Component, OnInit } from '@angular/core';
import{Item} from '../item';
import{ItemService} from '../item.service';
import { ActivatedRoute, Router } from '@angular/router'; 
import {NgbModule, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  item:Item[];
  itemEdit:Item;
  name: string;
  expiredDate: string;
  typeItem:string;
  updDate= new Date();
  dpick={ year: this.updDate.getFullYear(), month: this.updDate.getMonth()+1, day: 
   this.updDate.getDate() };
  // itemEd: Item;
  constructor(private itemService:ItemService, private route: Router,private modalService:NgbModal){
    this.itemEdit=new Item();
  }

  ngOnInit(): void {
    this.getItems()
  }

  dataDropdown = [
    {typeItem: 'Dapur'}, 
    {typeItem: 'Elektronik'}, 
    {typeItem: 'Buku'}, 
    {typeItem: 'Komputer'}, 
    {typeItem: 'Fashion'}]

  getItems():void{
    this.itemService.getItem().subscribe((item)=>{
      console.log('item',item)
      this.item=item
    });
  } 

  saveItem():void{
    console.log("newItem",this.name,this.expiredDate,this.typeItem)
    this.itemService.addItem({
       name: this.name, typeItem: this.typeItem, expiredDate: new Date (this.expiredDate).getTime() / 1000, uuid: uuidv4()}).subscribe(() => {
        this.itemService.getItem().subscribe((item) => {
          this.item = item;
          console.log('saveItem', this.name, this.typeItem, new Date (this.expiredDate).getTime() / 1000)
          alert("Data Berhasil Di Tambah")
          this.modalService.dismissAll()
        })
      })
  }

  saveEdit(id):void{ 
    console.log("newItem",this.itemEdit.name,this.itemEdit.expiredDate,this.itemEdit.typeItem)
    this.itemService.editItembyId(id,{name:this.itemEdit.name,expiredDate: (new Date(this.dpick.year, this.dpick.month-1, this.dpick.day )).getTime() / 1000,typeItem: this.itemEdit.typeItem}).subscribe((itemID)=>{ 
      console.log("newItem",itemID.name,itemID.typeItem)
      // this.itemEdit.expiredDate = (new Date(this.dpick.year, this.dpick.month-1, this.dpick.day )).getTime() / 1000
      this.itemService.getItem().subscribe((itemEd)=>{
        // console.log('item',this.itemEd.name,this.itemEd.expiredDate,this.itemEdit.typeItem)
        this.item=itemEd
        alert("Data Berhasil Di Edit")
        this.modalService.dismissAll()
        });
    });
  }

open(content){
  console.log("content",content)
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //   this.closeResult = `Closed with: ${result}`;
  // }, (reason) => {
  //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

edit(content,id){
  console.log(id)
  this.itemService.getItembyId(id).subscribe((item)=>{
    this.itemEdit=item;
    this.modalService.open(content)
  })
}

  deleteItems(id):void{
    // const id=this.route.snapshot.paramMap.get("id"); 
    this.itemService.deleteItembyId(id).subscribe((item)=>{ 
      this.itemService.getItem().subscribe((item)=>{
      console.log('item',item)
      this.item=item 
      });
    });
  }
}
