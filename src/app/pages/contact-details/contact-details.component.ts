import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service.js';




@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
        sum: ['', [Validators.required]]
    })
}
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private contactService = inject(ContactService)
  private userService = inject(UserService)


  showInput: boolean = false
  form!: FormGroup


  subscription!: Subscription

  contact$!: Contact

  async ngOnInit(): Promise<void> {
    this.subscription = this.route.data
      .pipe(map(data => data['contact']))
      .subscribe(contact => this.contact$ = contact)
  }

  onBack() {
    this.router.navigateByUrl('/contact')

  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  onTransfer(): void {
   var value = this.form.value.sum
   try {
    const hasMoney=  this.userService.updateBalance(value)  
    if(hasMoney){
      this.contactService.transferTo(value, this.contact$)
      this.toggleInput()
    }
   } catch (error) {
    console.log(error);
   }

  }

  toggleInput() {
    this.showInput = !this.showInput
  }
}
