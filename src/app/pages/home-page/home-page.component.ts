import { Component, inject, OnDestroy } from '@angular/core';
import { User } from '../../models/user.model.ts';
import { BitCoinService } from '../../services/bit-coin.service.js';
import { Subscription, switchMap, take, tap } from 'rxjs';
import { UserService } from '../../services/user.service.js';

@Component({
    selector: 'home-page',
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
    bitCoinService = inject(BitCoinService)

    userService = inject(UserService)
    // bitCoinRate!: string
    // user = this.userService.getUser()
    bitCoinRate$ = this.bitCoinService.getBitCoinRate()

    user$ = this.userService.getUserObs()
    bitCoinRate2$ = this.user$.pipe(
        switchMap(user => this.bitCoinService.getBitCoinRateStream(user.coins))
    )

    // constructor() {
    //     this.user = this.userService.getUser()
    //     this.getBitcoinRate();
    // }

    // getBitcoinRate(): void {
    //     this.subscription = this.bitCoinService.getBitCoinRate()
    //         .pipe(take(1))
    //         .subscribe(rate => {
    //             this.bitCoinRate = rate
    //         })
    // }

    // ngOnDestroy(): void {
    //     this.subscription?.unsubscribe?.()
    // }
}
