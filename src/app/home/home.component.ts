import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var owl1;
    owl1 = $('.slider-banner').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        lazyLoad: true,
        dots: true,
        dotsContainer: '.new-dots',
        autoplay: true,
        autoplayTimeout: 3500,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            }
        }
    });
    $('.new-dots').on('click', 'li', function(e) {
        owl1.trigger('to.owl.carousel', [$(this).index(), 300]);
    });

    $('.btn-rt').click(function() {
        owl1.trigger('next.owl.carousel');
    })
    $('.btn-lt').click(function() {
        owl1.trigger('prev.owl.carousel');
    })
  }

}
