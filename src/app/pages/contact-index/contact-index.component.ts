import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';

@Component({
    selector: 'contact-index',
    templateUrl: './contact-index.component.html',
    // styleUrl: './contact-index.component.scss',
})
export class ContactIndexComponent {
    contactService = inject(ContactService)
    contacts$ = this.contactService.contacts$


    ngOnInit(): void {
        // this.contacts$ = 
    }
}
