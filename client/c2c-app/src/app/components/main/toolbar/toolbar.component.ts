import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  role = null;
  constructor(private r:Router) { }

  ngOnInit() {
    this.role = localStorage.getItem('c2c_role');
    console.log(this.role);
  }

  gotoHome(){
    this.r.navigate(['home']);
  }
}
