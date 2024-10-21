import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  hashCode(code:string){
    let hash = CryptoJS.SHA256(code).toString(CryptoJS.enc.Hex)
    return hash
  }

  checkLan (){
    let lan = localStorage.getItem('lan')
    if (!lan){
      localStorage.setItem('lan', 'en')
      lan = 'en'
    }
    return lan
  }

  changeLanguage (language:string) {
    localStorage.setItem('lan', language)
  }

  constructor() { }
}
