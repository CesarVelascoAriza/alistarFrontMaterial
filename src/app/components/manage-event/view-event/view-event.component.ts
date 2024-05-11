import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {

  day = new Date()
  min =new Date(new Date().getFullYear()-80 , 0, 1);
  max =new Date(new Date().getFullYear()-18 ,new Date().getMonth(),  this.day.getDate() );

  constructor(
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
  }

  formControlViewEvent = this.fb.group({
    fecha:['', Validators.required]
  })

  submitVisualizar() {
    console.log(this.formControlViewEvent.value.fecha)
  }

}
