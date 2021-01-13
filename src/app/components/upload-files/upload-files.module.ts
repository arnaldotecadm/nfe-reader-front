import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UploadFilesComponent } from "./upload-files.component";
import { MatTableModule } from "@angular/material/table";

@NgModule({
  declarations: [UploadFilesComponent],
  imports: [CommonModule, MatTableModule],
  exports: [UploadFilesComponent],
})
export class UploadFilesModule {}
