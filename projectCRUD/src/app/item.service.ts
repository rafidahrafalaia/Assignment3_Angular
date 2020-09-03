import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from './item';

@Injectable({
    providedIn:'root'
})
export class ItemService{
    private BASE_URL='https://5d60ae24c2ca490014b27087.mockapi.io/api/v1/items';
    constructor(private http: HttpClient){

    }
    getItem(){
        return this.http.get<Item[]>(`${this.BASE_URL}`)
    }

    getItembyId(id){
        return this.http.get<Item>(`${this.BASE_URL}/${id}`)
    }
    editItembyId(id,item){
        return this.http.put<Item>(`${this.BASE_URL}/${id}`,item)
    }
    deleteItembyId(id){
        return this.http.delete<Item>(`${this.BASE_URL}/${id}`)
    }
    addItem(item){
        return this.http.post<Item[]>(`${this.BASE_URL}`, item)
    }
}