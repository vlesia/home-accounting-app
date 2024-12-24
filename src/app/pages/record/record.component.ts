import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-record',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatIconModule],
  templateUrl: './record.component.html',
  styleUrl: './record.component.scss',
})
export class RecordComponent implements OnInit {
  public tableColumns: string[] = ['index', 'category', 'limit', 'actions'];
  public userCategories = []; //Category

  //private historyService = inject(HistoryService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    // const subscription = this.historyService.getCategories().subscribe({
    //   next: (categories) => (this.userCategories = categories),
    // });

    // this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
