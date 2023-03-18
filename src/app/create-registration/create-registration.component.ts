import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../models/user,model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent implements OnInit {
  public packages = ["Monthly", "Quarterly", "Yearly"]
  public importantList: string[] = ["Toxic Fat reduction", "Energy and Endurance", "Building lean Muscle", "Healthier Digestive System", "Suger Craving Body", "Build Confidence", " Improve Overall Appearance", "Feel More Energized", "Fitness"]

  public registerForm!: FormGroup;
  public userIdToUpdate!:number;
  isUpdateActive:boolean = false
  constructor(private _fb: FormBuilder, private api:ApiService, private toastService:NgToastService, private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.registerForm = this._fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiResult: [''],
      gender: [''],
      requireTrainer: [''],
      package: [''],
      important: [''],
      haveGymBefore: [''],
      enquiryDate: ['']
    });

    this.registerForm.controls['height'].valueChanges.subscribe(res=>{
      this.calculateBmi(res)
    })

    this.activatedRoute.params.subscribe(val=>{
      this.userIdToUpdate = val['id'];
      this.api.getRegisteredUser(this.userIdToUpdate)
      .subscribe(res=>{
        this.isUpdateActive = true
        this.fillFormToUpdate(res);
      })
    })

  }
  submit() {
    this.api.postRegistration(this.registerForm.value)
    .subscribe(res=>{
      this.toastService.success({detail:"Success",summary:"Enquiry Added",duration:3000});
      this.registerForm.reset();
    })
  }

  update(){
    this.api.updateRegisterUser(this.registerForm.value, this.userIdToUpdate)
    .subscribe(res=>{
      this.toastService.success({detail:"Success",summary:"Enquiry Updated",duration:3000});
      this.registerForm.reset();
      this.router.navigate(['list'])
    })
  }

  calculateBmi(heightValue: number) {
    const weight = this.registerForm.value.height;
    const height = heightValue;
    const bmi = weight / (height * height);
    this.registerForm.controls['bmi'].patchValue(bmi);
    switch (true) {
      case bmi < 18.5:
        this.registerForm.controls['bmiResult'].patchValue("Underweighgt");
        break;
      case (bmi >= 18.5 && bmi < 25):
        this.registerForm.controls['bmiResult'].patchValue("Normal");
        break;
      case (bmi >= 25 && bmi < 30):
        this.registerForm.controls['bmiResult'].patchValue("Overweighgt");
        break;

      default:
        this.registerForm.controls['bmiResult'].patchValue("Obese");
        break;
    }
  }

  fillFormToUpdate(user:User){
    this.registerForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      weight: user.weight,
      height: user.height,
      bmi: user.bmi,
      bmiResult: user.bmiResult,
      gender: user.gender,
      requireTrainer: user.requireTrainer,
      package: user.package,
      important: user.important,
      haveGymBefore: user.haveGymBefore,
      enquiryDate: user.enquiryDate
    })
  }
}
