import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class HungarianPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Elemek száma oldalanként:';
  override nextPageLabel     = 'Következő oldal';
  override previousPageLabel = 'Előző oldal';
  override firstPageLabel    = 'Első oldal';
  override lastPageLabel     = 'Utolsó oldal';
}