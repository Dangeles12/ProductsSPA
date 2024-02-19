import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseModel } from '../models/baseModel.model';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class BaseService<T extends BaseModel> {
    baseUrl:string = ""
    headers:HttpHeaders = new HttpHeaders();
    
    constructor(private http:HttpClient, @Inject('controller') private controller:string) {
        this.baseUrl = environment.baseUrl;
        this.headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*')

    }  

    get(){
        this.headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*')

        return this.http.get<T[]>(`${this.baseUrl}/${this.controller}`)
    }   

    find(id:number){
        this.headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*')

        return this.http.get<T>(`${this.baseUrl}/${this.controller}/${id}`)
    }

    post(obj: T){
        this.headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*')

        return this.http.post(`${this.baseUrl}/${this.controller}`, obj)
    }

    put(obj: T){
        this.headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*')

        return this.http.put(`${this.baseUrl}/${this.controller}`, obj)
    }

    delete(id:number){
        this.headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*')

        return this.http.delete(`${this.baseUrl}/${this.controller}/${id}`)
    }
}