import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { API } from '../models/API';
import { ActivatedRoute } from '@angular/router';
import { APIDefinition } from '../models/APIDefinition';
import { APIDetails } from '../models/APIDetails';
import { Paths } from '../models/Paths';
import { URLMappings } from '../models/URLMappings';

@Component({
  selector: 'app-get-api-details',
  templateUrl: './get-api-details.component.html',
  styleUrls: ['./get-api-details.component.css'],
  providers: [ApiServiceService]
})
export class GetApiDetailsComponent implements OnInit {

  private apiSvc: ApiServiceService;
  public apiDetails: APIDetails;
  private id: string;
  public apiDefinition: APIDefinition;
  public apiPaths: Paths[];

  constructor(apiSvc: ApiServiceService, private _route: ActivatedRoute) {
    this.apiSvc = apiSvc;
    this.apiDetails = new APIDetails();
    this.apiDefinition = new APIDefinition();
  }

  ngOnInit() {

    console.log('GetApiDetailsComponent called');

    this._route.params.subscribe(
      (params) => this.id = params["id"]
    );

    this.getAPIDetails(this.id);
  }

  getAPIDetails(id: string) {

    this.apiSvc.getAPIDetails(id).subscribe(

      data => {

        this.apiDetails = data;
        this.apiDefinition = JSON.parse(this.apiDetails.apiDefinition);
        var paths = this.apiDefinition.paths;

        this.apiPaths = Object.keys(paths).map(key => {

          var locPath = new Paths();

          locPath.name = key;

          locPath.urlPattern = Object.keys(paths[key]).map(key1 => {

            // console.log(key1);

            var value = paths[key][key1];

            // console.log(value);

            var locUrlMappings = new URLMappings();

            locUrlMappings.name = key1;
            locUrlMappings.description = value.description;
            locUrlMappings.authType = value["x-auth-type"];
            locUrlMappings.throttlingTier = value["x-throttling-tier"];
            locUrlMappings.params = value.parameters;

            locUrlMappings.responses = Object.keys(value.responses).map(respKey => {

              var respRec = {
                statusCode: respKey,
                description: value.responses[respKey]["description"]
              };

              return respRec;
            });

            // console.log(locUrlMappings);

            return locUrlMappings;
          });

          return locPath;
        });
      },
      err => console.log('Error -- ' + err),
      () => console.log('Get API Details Executed Successfully!')
    );
  }

  public publishAPI(apiId: string): void {
    this.apiSvc.changeAPIStatus("Publish", apiId).subscribe(
      (value) => {
        console.log('Status Change Response -- ' + value);
      });
  }
}
