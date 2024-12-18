import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { finalize } from 'rxjs';

import { BillService } from '../../services/bill.service';
import { ExchangeData, UserBalance } from '../../models/bill.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [
    MatTableModule,
    DatePipe,
    DecimalPipe,
    MatIconModule,
    MatToolbarModule,
  ],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss',
})
export class BillingComponent implements OnInit {
  exchangeData: ExchangeData[] = [];
  userBalances: UserBalance[] = [];
  userBalanceColumns: string[] = ['currency', 'amount'];
  exchangeDataColumns: string[] = ['currency', 'rate', 'date'];
  isLoading = false;
  error = '';

  private billService = inject(BillService);
  private destroyRef = inject(DestroyRef);
  private userService = inject(UserService);

  ngOnInit(): void {
    const user = this.userService.getUser();

    if (!user) {
      return;
    }

    this.isLoading = true;
    const subscription = this.billService
      .getCalculatedAccountValue(user.id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.userBalances = data.userBalances;
          this.exchangeData = data.exchangeData;
        },
        error: (err) => {
          this.error = err.message;
        },
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
