import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MediaObserver, MediaChange } from '@angular/flex-layout'
import { Subscription } from  'rxjs'

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit, OnDestroy{

  showFiller = false;
  mediasub: Subscription | undefined;
  devices: boolean | undefined;

  constructor(private breakpointObserver: BreakpointObserver,
    public mediaObserver: MediaObserver) {}

  ngOnInit(){
    this.mediasub = this.mediaObserver.media$.subscribe((result:MediaChange) => {
      console.log(result.mqAlias);   
      this.devices = result.mqAlias === 'xs' ? true : false;   
    })
  }

  ngOnDestroy(){
    this.mediasub?.unsubscribe();
  }
}
