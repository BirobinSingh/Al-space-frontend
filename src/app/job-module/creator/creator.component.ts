import { Component, OnInit, inject ,signal} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from '../../api.service';

export interface Skill {
  name: string;
}

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit {

  contactForm: FormGroup;
  categories = [
    { id: 1, name: "Project Manager" },
    { id: 2, name: "Developer" },
    { id: 3, name: "Coach" },
    { id: 4, name: "Hr" },
    { id: 5, name: "Business Development" }
  ];
  addOns = [
    { id: 0, addOn: "This is First Add On", checked: false },
    { id: 1, addOn: "This is Second Add On", checked: false },
    { id: 2, addOn: "This is third Add on", checked: false }
  ];

  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly skills = signal<Skill[]>([]);
  readonly announcer = inject(LiveAnnouncer);

  hideSingleSelectionIndicator = signal(false);

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.contactForm = this.fb.group({
      category: [null],
      title: [null],
      skill: this.fb.array([]),
      addOns: this.fb.array([]),
      additionalInfo: this.fb.array([]),
      text: new FormControl(),
      level: ['', Validators.required],
      paymentType: ['0', Validators.required],
      amount: [''],
      min: [],
      max: []
    });
  }

  ngOnInit() {
    console.log("this is skills:", this.getSkills);
  }

  get paymentType(): string {
    return this.contactForm.get('paymentType')?.value;
  }

  get getSkills(): FormArray {
    return this.contactForm.get('skill') as FormArray;
  }

  get addOn(): FormArray {
    return this.contactForm.get('addOns') as FormArray;
  }

  get additionalInfo(): FormArray {
    return this.contactForm.get('additionalInfo') as FormArray;
  }

  toggleSingleSelectionIndicator() {
    this.hideSingleSelectionIndicator.update(value => !value);
  }

  addOnChanged(id: number, event: any) {
    const checkbox = this.addOns.find(cb => cb.id === id);
    if (checkbox) {
      checkbox.checked = event.checked;
      checkbox.checked ? this.addAddOn(checkbox) : this.removeAddOn(checkbox);
    }
  }

  addAddOn(checkbox: any) {
    this.addOn.push(new FormControl(checkbox));
  }

  removeAddOn(checkbox: any) {
    const index = this.addOn.controls.findIndex(item => item.value === checkbox);
    if (index >= 0) {
      this.addOn.removeAt(index);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.skills.update(skills => [...skills, { name: value }]);
      this.getSkills.push(new FormControl(value));
    }
    event.chipInput!.clear();
  }

  remove(skill: Skill): void {
    this.skills.update((skills:any) => {
      const index = skills.indexOf(skill);
      if (index >= 0) {
        skills.splice(index, 1);
        this.getSkills.removeAt(index);
        this.announcer.announce(`Removed ${skill.name}`);
      }
      return [...skills];
    });
  }

  edit(skill: Skill, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(skill);
      return;
    }
    this.skills.update(skills => {
      const index = skills.indexOf(skill);
      if (index >= 0) {
        skills[index].name = value;
        return [...skills];
      }
      return skills;
    });
  }

  addInfo() {
    const item = this.fb.group({
      additionalInfo: ['', Validators.required]
    });
    this.additionalInfo.push(item);
  }

  removeInfo(i: number) {
    this.additionalInfo.removeAt(i);
  }

  submit() {
    console.log("Form Submitted");
    console.log(this.contactForm.value);

    this.apiService.addJobPosting(this.contactForm.value).subscribe(response => {
      console.log(response);
    });
  }
}







































// import { Component, OnInit,signal } from '@angular/core';
// import { FormBuilder, FormGroup, FormArray, FormControl, Validators, Form } from '@angular/forms';
// import {LiveAnnouncer} from '@angular/cdk/a11y';
// import {COMMA, ENTER,} from '@angular/cdk/keycodes';
// import {inject } from '@angular/core';
// import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
// import { ApiService } from '../../api.service';



// export interface Skill  {
//   name: string;
// }

// @Component({
//   selector: 'app-creator',
//   templateUrl: './creator.component.html',
//   styleUrl: './creator.component.css'
// })
// export class CreatorComponent  implements OnInit {

//   contactForm: FormGroup;

//   constructor(private fb: FormBuilder,
//     private apiService:ApiService
//   ) {
//     this.contactForm = this.fb.group({
//       category: [null],
//       title:[null],
//       skill:this.fb.array([]),
//       addOns: this.fb.array([]),
//       additionalInfo:this.fb.array([]),
//       text: new FormControl(),
//       level:['',Validators.required],
//       paymentType:['0',Validators.required],
//       amount:[''],
//       min:[],
//       max:[]
//     });
//   }


//   ngOnInit() {

//     console.log("this is skillst", this.getSkills);
    
//   }

//   //Code for payment type form control
//   get paymentType():string { return this.contactForm.get('paymentType')?.value; }

//   // Dummy Data
//   categories = [
//     { id: 1, name: "Project Manager" },
//     { id: 2, name: "Developer" },
//     { id: 3, name: "Coach" },
//     { id: 4, name: "Hr" },
//     { id: 5, name: "Business Development" }
//   ];

//   addOns=[
//     {id:0, addOn:"This is First Add On", checked : false},
//     {id:1, addOn:"This is Second Add On", checked : false},
//     {id:2, addOn:"This is third Add on", checked : false}
//   ]


//   //Code for ADD Ons (Toggle)
//   hideSingleSelectionIndicator = signal(false);
//   toggleSingleSelectionIndicator() {
//     this.hideSingleSelectionIndicator.update(value => !value);
//   }
//   addOnChanged(id:number, event: any)
//   {
//     const checkbox = this.addOns.find(cb => cb.id===id)
//     if(checkbox)
//     {
//       checkbox.checked = event.checked;
//       checkbox.checked ? this.addAddOn(checkbox) : this.removeAddOn(checkbox)
//     } 
//   }
//   get addOn() : FormArray{
//     return this.contactForm.get("addOns") as FormArray
//   }
//   addAddOn(checkbox : any)
//   {
//     this.addOn.push(new FormControl(checkbox)) 
//   }
//   removeAddOn(checkbox:any)
//   {
//     const index = this.addOn.controls.findIndex(item => item.value===checkbox);
//     this.addOn.removeAt(index);
//   }

  
//   //Code for chip Angular Material
//   readonly addOnBlur = true;
//   readonly separatorKeysCodes = [ENTER, COMMA] as const;
//   readonly skills = signal<Skill[]>([]);
//   readonly announcer = inject(LiveAnnouncer);
//   get getSkills():FormArray{
//     return this.contactForm.get("skill") as FormArray
//   }

//   add(event: MatChipInputEvent): void {
//     const value = (event.value || '').trim();
//     // Add our skill
//     // console.log("this is value");
    
//     if (value) {
//       this.skills.update(skills => [...skills, {name: value}]);
//       this.getSkills.push(new FormControl(value))
//     }
//     // Clear the input value
//     event.chipInput!.clear();

//   }
//   remove(skill: Skill): void {
//     this.skills.update(skills => {
//       const index = skills.indexOf(skill);
//       if (index < 0) {
//         return skills;
//       }
//       skills.splice(index, 1);
//       this.getSkills.removeAt(index);
//       this.announcer.announce(`Removed ${skill.name}`);
//       return [...skills];
//     });
//   }
//   edit(skill: Skill, event: MatChipEditedEvent) {
//     const value = event.value.trim();
//     // Remove Skill if it no longer has a name
//     if (!value) {
//       this.remove(skill);
//       return;
//     }
//     // Edit existing Skill
//     this.skills.update(skills => {
//       const index = skills.indexOf(skill);
//       if (index >= 0) {
//         skills[index].name = value;
//         return [...skills];
//       }
//       return skills;
//     });
//   }



//   //Additional Information
//   get additionalInfo():FormArray{
//     return this.contactForm.get("additionalInfo") as FormArray
//   }
  
//   addInfo(){
//     const item=this.fb.group({
//       additionalInfo:['',Validators.required]
//     })
//     this.additionalInfo.push(item)
//   }
//   removeInfo(i:number){
//     this.additionalInfo.removeAt(i);
//   }
  
//   //Code for form submission
//   submit() {
//     console.log("Form Submitted")
//     console.log(this.contactForm.value)


//     this.apiService.addJobPosting(this.contactForm.value).subscribe(response=>{
//       console.log(response);
//     })
//   }
// }
