import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Injectable } from '@angular/core';


export interface DialogData {
  content:any,
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {


  constructor() { }
}
