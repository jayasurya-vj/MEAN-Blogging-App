import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  message = "An unknown Error Occured!"
  constructor(@Inject(MAT_DIALOG_DATA)public data:{message:string}) { }

  ngOnInit(): void {
  }
 
}
