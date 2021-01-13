import { HttpEventType } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Observable } from "rxjs";
import { UploadFilesService } from "../upload-files.service";

@Component({
  selector: "app-upload-files",
  templateUrl: "./upload-files.component.html",
  styleUrls: ["./upload-files.component.scss"],
})
export class UploadFilesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public contratos$: Observable<any[]>;
  displayedColumns: string[] = ["position", "name", "weight", "symbol"];
  dataSource;

  selectedFiles: FileList;

  nfe: any;

  progressInfos = [];
  message = "";
  indexToBeProcessed = 0;

  fileInfos: Observable<any>;

  constructor(private uploadService: UploadFilesService) {}

  ngOnInit() {
    this.fileInfos = this.uploadService.getFiles();
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
  }

  selectFiles(event) {
    this.progressInfos = [];
    this.indexToBeProcessed = 0;
    this.dataSource.data = [...this.dataSource.data, ...event.target.files];
    this.selectedFiles = event.target.files;
    this.dataSource.paginator = this.paginator;
  }

  upload(idx, file) {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    this.uploadService.upload(file).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(
            (100 * event.loaded) / event.total
          );
        } else if (event.type === HttpEventType.Response) {
          this.nfe = event.body.nfe;
          let infNFe = this.nfe.infNFe;
          //this.dataSource.data[idx] = this.nfe;
          this.dataSource.data[idx].status = "success";
          this.dataSource.data[idx].nNF = infNFe.ide.nnf;
          this.dataSource.data[idx].destinatario = infNFe.dest.xnome;
        }
      },
      (err) => {
        this.progressInfos[idx].value = 0;
        this.message = "Could not upload the file:" + file.name;
        this.dataSource.data[idx].status = "failure";
      }
    );
  }

  uploadFiles() {
    this.message = "";
    for (let i = 0; i < this.dataSource.data.length; i++) {
      // if (!this.dataSource.data[i].status) {
      this.dataSource.data[i].status = "processing";
      this.upload(i, this.dataSource.data[i]);
      // }
    }
  }
}
