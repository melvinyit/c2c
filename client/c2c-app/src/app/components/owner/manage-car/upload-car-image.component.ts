import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload-car-image',
  templateUrl: './upload-car-image.component.html',
  styleUrls: ['./upload-car-image.component.css']
})
export class UploadCarImageComponent implements OnInit {

  constructor(private router:Router,private fb:FormBuilder, private carSrv:CarService, private ar:ActivatedRoute) { }

  @ViewChild('carImageFile', { static: false })
  carImageFile: ElementRef;

  uploadImageForm:FormGroup=this.fb.group({
    //car_id:[''],
    carImage:['',Validators.required]
  });

  ngOnInit() {
  }

  onUpload(){
    console.log(this.uploadImageForm.value);
    const formData = new FormData();
    formData.set('carImage', this.carImageFile.nativeElement.files[0]);
    formData.set('car_id', this.ar.snapshot.params['carid']);
    this.carSrv.uploadCarImage(formData).then(r=>{
      console.log(r);
      this.router.navigate(['/owner/manage-car/'+this.ar.snapshot.params['carid']]);
    }).catch(e=>{console.log(e);});
  }

}
