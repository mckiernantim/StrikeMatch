
    
import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';

export interface DialogData {
  content:any,
  name: string;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {

 content: any;
  name: string;

  constructor(public dialog: MatDialog) {}

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(ModalContent, {
  //     width: '250px',
  //     data: {name: this.name, content: this.content}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.content = result;
  //   });
  // }

}

// @Component({
//   selector: 'app-modal-content',
//   templateUrl: './modal.component.html',
// })
// export class ModalContent {

//   constructor(
//     public dialogRef: MatDialogRef<ModalContent>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }
