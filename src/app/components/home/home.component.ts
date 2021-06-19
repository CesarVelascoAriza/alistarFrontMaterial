import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  slideIndex: number = 1
  constructor() {

  }

  ngOnInit(): void {
    console.log(this.slideIndex)
    this.showSlides(this.slideIndex);
  }


 plusSlides(n:any) {
  this.showSlides(this.slideIndex += n);
}

 currentSlide(n:any) {
  this.showSlides(this.slideIndex = n);
}

 showSlides(n:any) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) { this.slideIndex = 1 }
  if (n < 1) { this.slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {

    slides[i].className += ' display'
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[this.slideIndex - 1].className.replace('display','pruba');
  dots[this.slideIndex - 1].className += " active";
}
}
