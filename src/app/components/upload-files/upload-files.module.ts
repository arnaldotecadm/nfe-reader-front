import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { UploadFilesComponent } from "./upload-files.component";

@NgModule({
  declarations: [UploadFilesComponent],
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatTabsModule],
  exports: [UploadFilesComponent],
})
export class UploadFilesModule {}
