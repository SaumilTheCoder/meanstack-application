import { Component, NgZone, OnInit } from '@angular/core';
import { CustomValidators } from 'ngx-custom-validators';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CanDeactivate, Router } from "@angular/router";
import { ApiserviceService } from 'src/app/apiservice.service';
import { ActivatedRoute } from '@angular/router'; 
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { ComponentCanDeactivate } from 'src/app/component-can-deactivate';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit,ComponentCanDeactivate {
  
  studentFormdata : FormGroup;

  canDeactivate(): boolean{
    // alert("hii");
    return !this.isDirty;
  }

  isDirty= false;
  getId:any;
  formBasic: FormGroup;
  loading: boolean;
  radioGroup: FormGroup;
  errormsg:any;
  successmsg:any;
  submitted: boolean | undefined;
  updateForm: any;
  // getparamid:any;
  

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private service:ApiserviceService,
    private router:Router,
    private a_router:ActivatedRoute,
    private formBuilder:FormBuilder,
    private ngZone:NgZone
    
  ) {
    this.studentFormdata = this.formBuilder.group({
      id:[''],
      name:[''],
      price:[''],
      description:['']
    })
    
   }
  //  getparamid:any;
  
  ngOnInit():void {
    // alert(this.getId);
    this.getId = this.a_router.snapshot.paramMap.get('id');
    // // console.log(this.getId);
    if(this,this.getId)
    {
    this.service.getBook(this.getId).subscribe(res=>{
      alert("hii123");
      console.log(res,"update==>");
     this.studentForm.patchValue({
       name:res['name'],
        price:res['price'],
        description:res['description']
     })
    });
  }
    // this.studentForm = this.formBuilder.group({
    //   name:[''],
    //   price:[''],
    //   description:['']
    // })
  }

  studentForm = new FormGroup({
    'name':new FormControl('',Validators.required),
    'price':new FormControl('',Validators.required),
    'description':new FormControl('',Validators.required),
  });

  get f() { return this.studentForm.controls; }

  // onSubmit():any{
  //   this.service.AddStudnet(this.studentFormdata.value)
  //   .subscribe(()=>{
  //     console.log('Data Added Succesfully..');
  //     this.ngZone.run(() =>  this.router.navigateByUrl('/tables/filter'))
  //     });
  // }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.studentForm.invalid) {
        return;
    }
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.studentForm.value, null, 4));
}

  // create data..
  studentSubmit(){
    // console.log(this.studentForm.value);
    // alert("hii students..");
      if(this.studentForm.valid)
      {
        console.log("datacheck",this.studentForm.value);
        this.service.AddStudnet(this.studentForm.value).subscribe((res)=>{
          console.log(res,'data added==>');
          this.studentForm.reset();
          this.successmsg = res.message;

          this.router.navigateByUrl("/tables/filter");
        });
      }
      else
      {
        this.errormsg= 'All Fields Required..';    
      }
  }

  onUpdate(){
    // this.getparamid=true;
    // alert("update click");
    this.service.updateBook(this.getId,this.studentForm.value).subscribe(res=>{
      console.log("Data Updated Succesfully..");
      this.ngZone.run(() => { this.router.navigateByUrl('/book-list')})
    },(err)=>{
      console.log(err);

    })
  }

  //update data..
  studentUpdate(){
    
    // alert("checking..");
    // console.log(this.studentForm.value,'Updated Form..');
    this.service.updateBook(this.getId,this.studentForm.value).subscribe(res=>{
      console.log("Data Updated Succesfully..");
      this.ngZone.run(() => { this.router.navigateByUrl('/tables/filter')})
    },(err)=>{
      console.log(err);

    })

    // if(this.studentForm.valid)
    // {
    //     this.service.updateData(this.studentForm.value,this.getparamid).subscribe((res)=>{
    //         console.log(res,'resupdated..');
    //         this.successmsg =res.message;

    //     });
    // }
    // else
    // {
    //     this.errormsg = 'All Fields Are Required..';
    // }
  }
  
  buildFormBasic() {
    this.formBasic = this.fb.group({
      experience: []
    });
  }

  submit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.toastr.success('Profile updated.', 'Success!', {progressBar: true});
    }, 3000);
  }

}
