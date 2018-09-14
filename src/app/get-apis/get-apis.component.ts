import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { API } from '../models/API';

@Component({
  selector: 'app-get-apis',
  templateUrl: './get-apis.component.html',
  styleUrls: ['./get-apis.component.css'],
  providers: [ApiServiceService]
})
export class GetApisComponent implements OnInit {

  public apiSvc: ApiServiceService;
  public apiRecords: API[];
  public apiDetails: API;

  constructor(apiSvc: ApiServiceService) {
    this.apiSvc = apiSvc;
  }

  ngOnInit() {
    this.getAllAPIs();
  }

  getAllAPIs() {

    this.apiSvc.getAllAlertDetails().subscribe(

      data => {
        // console.log('Result -- ' + data);
        this.apiRecords = data;
      },
      err => console.log('Error -- ' + JSON.stringify(err)),
      () => console.log('Get APIs Executed Successfully!')
    );
  }

  /* getAPIDetails(id: string) {

    this.apiSvc.getAPIDetails(id).subscribe(

      data => {
        console.log('Result -- ' + data);
        this.apiDetails = data;
      },
      err => console.log('Error -- ' + JSON.stringify(err)),
      () => console.log('Get API Details Executed Successfully!')
    );
  } */
}
