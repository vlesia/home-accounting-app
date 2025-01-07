import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';

import { HistoryService } from '../../services/history.service';
import { Category } from '../../models/history.model';
import { RecordService } from '../../services/record.service';
import { ModalFormEventComponent } from '../../layout/modal-form-event/modal-form-event.component';

@Component({
  selector: 'app-record',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatIconModule],
  templateUrl: './record.component.html',
  styleUrl: './record.component.scss',
})
export class RecordComponent implements OnInit, OnDestroy {
  public tableColumns: string[] = ['index', 'category', 'limit', 'actions'];
  public userCategories: Category[] = [];
  private destroy$ = new Subject<void>();

  private historyService = inject(HistoryService);
  private recordService = inject(RecordService);

  public ngOnInit(): void {
    this.historyService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categories) => {
          this.userCategories = categories;
        },
      });
  }

  public openFormEvent(): void {
    this.recordService
      .openDialog(ModalFormEventComponent)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: (error) => {
          console.error(error.message);
        },
      });
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
