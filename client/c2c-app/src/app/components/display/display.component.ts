import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  message = null;
  constructor(private ar:ActivatedRoute,private router:Router) { }

  ngOnInit() {

    this.message=this.ar.snapshot.params['msg'];
  }

}
