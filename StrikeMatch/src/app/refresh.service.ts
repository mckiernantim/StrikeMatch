import { Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class RefreshService {
refresh(){
  this.router.navigate(["/dashboard"])
}
  constructor(public router:Router) { }
}
