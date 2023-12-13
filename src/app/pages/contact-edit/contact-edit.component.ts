import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, filter, map, takeUntil } from 'rxjs';
import { Contact } from '../../models/contact.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'contact-edit',
    templateUrl: './contact-edit.component.html',
    styleUrl: './contact-edit.component.scss'
})
export class ContactEditComponent implements OnInit, OnDestroy {

    form!: FormGroup

    private contactService = inject(ContactService)
    private router = inject(Router)
    private route = inject(ActivatedRoute)

    destroySubject$ = new Subject<void>()

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]]
        })
    }

    contact!: Contact


    ngOnInit(): void {

        this.route.data
            .pipe(
                map(data => data['contact']),
                filter(contact => !!contact)
            )
            .subscribe(contact => {
                this.contact = contact
                this.form.patchValue(contact)
            })
    }

    onDeleteContact(contactId: string) {
        this.contactService.deleteContact(contactId)
            .pipe(takeUntil(this.destroySubject$),)
            .subscribe({
                next: this.onBack,
                error: err => console.log('err:', err)
            })
    }

    onSaveContact() {
        const contact = { ...this.contact, ...this.form.value }
        this.contactService.saveContact(contact as Contact)
            .pipe(takeUntil(this.destroySubject$),)
            .subscribe({
                next: this.onBack,
                error: err => console.log('err:', err)
            })
    }

    onBack = () => {
        this.router.navigateByUrl('/contact')
    }

    ngOnDestroy(): void {
        this.destroySubject$.next()
    }
}
