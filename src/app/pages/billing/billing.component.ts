import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { finalize } from 'rxjs';

import { BillService } from '../../services/bill.service';
import { ExchangeData, UserBalance } from '../../models/bill.model';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [
    MatTableModule,
    DatePipe,
    DecimalPipe,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss',
})
export class BillingComponent implements OnInit {
  public exchangeData: ExchangeData[] = [];
  public userBalances: UserBalance[] = [];
  public userBalanceColumns: string[] = ['currency', 'amount'];
  public exchangeDataColumns: string[] = ['currency', 'rate', 'date'];
  public isLoading = false;
  public error = '';

  private billService = inject(BillService);
  private destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.loadAccountData();
  }

  public loadAccountData(): void {
    this.isLoading = true;
    this.error = '';

    const subscription = this.billService
      .getCalculatedAccountValue()
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
