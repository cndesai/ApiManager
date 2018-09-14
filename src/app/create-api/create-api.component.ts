import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { APIDefinition } from '../models/APIDefinition';
import { APIDetails } from '../models/APIDetails';
import { Paths } from '../models/Paths';
import { URLMappings } from '../models/URLMappings';

@Component({
  selector: 'app-create-api',
  templateUrl: './create-api.component.html',
  styleUrls: ['./create-api.component.css']
})
export class CreateApiComponent implements OnInit {

  options = ['GET', 'POST', 'PUT'];
  optionSelected: any;

  public apiSvc: ApiServiceService;

  constructor(apiSvc: ApiServiceService) {
    this.apiSvc = apiSvc;
  }

  title: string = "Create New API";
  apiTemplate: string = "";

  api: APIDetails = new APIDetails();
  apiDefinitionJSON: string = "";
  endPointConfigJSON: string = "";
  path: Paths = new Paths();
  urlMapping: URLMappings = new URLMappings();

  ngOnInit() {
    this.apiSvc.getJSON().subscribe(data => {
      this.apiTemplate = data;
    });
  }

  public createNewAPI(): void {

    this.apiDefinitionJSON = this.generateApiDefinitionJSON(this.api.name,
      this.api.description, this.path.name, this.urlMapping.name, this.urlMapping.description, "200");

    this.endPointConfigJSON = this.getEndPointConfig(this.api.context, this.api.name);

    this.apiTemplate = this.apiTemplate.replace("__NAME__", this.api.name);
    this.apiTemplate = this.apiTemplate.replace("__DESCRIPTION__", this.api.description);
    this.apiTemplate = this.apiTemplate.replace("__CONTEXT__", this.api.context);
    this.apiTemplate = this.apiTemplate.replace("__VERSION__", this.api.version);
    this.apiTemplate = this.apiTemplate.replace("__APIDEFINITION__", this.apiDefinitionJSON);
    this.apiTemplate = this.apiTemplate.replace("__TAGS__", this.api.tags);
    this.apiTemplate = this.apiTemplate.replace("__ENDPOINTCONFIG__", this.endPointConfigJSON);

    this.apiSvc.createAPIWithTemplate(this.apiTemplate).subscribe(
      (value) => {
        console.log('API Create Response -- ' + value);
      });
  }

  public generateApiDefinitionJSON(apiName: string, apiDescription: string,
    pathName: string, actionName: string, actionDescription: string, response: string): string {

    var sampleObject = {

      paths: {
        [pathName]: {
          [actionName]: {
            "x-auth-type": "Application & Application User",
            "x-throttling-tier": "Unlimited",
            "description": actionDescription,
            "parameters": [],
            "responses": {
              [response]: {
                "headers": {
                },
                "description": "OK."
              }
            }
          }
        }
      },
      "schemes": [
        "https"
      ],
      "produces": [
        "application/json"
      ],
      "swagger": "2.0",
      "consumes": [
        "application/json"
      ],
      "info": {
        "title": apiName,
        "description": apiDescription,
        "license": {
          "name": "Apache 2.0",
          "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        },
        "contact": {
          "email": "chintan.desai@ingramcontent.com",
          "name": "Chintan Desai",
          "url": "http://appcentral-dev.ingramcontent.com"
        },
        "version": "1.0.0"
      }
    };

    return JSON.stringify(sampleObject).replace(/"/g, "\\\"");
  }

  public getEndPointConfig(context: string, apiName: string): string {

    // var sampleObject = "\"production_endpoints\": {\"url\": \"https://localhost:9443/am/" + context + "/" + apiName + "/v1/api/"\", \"config\": null},    \"sandbox_endpoints\": {\"url\": \"https://localhost:9443/am/" + context + "/" + apiName + "/v1/api/\"",\"config\": null}";

    var endPointConfigJSON = "{\\\"production_endpoints\\\":{\\\"url\\\":\\\"https://localhost:9443/am/" + context + "/" + apiName + "/v1/api/\\\",\\\"config\\\":null},\\\"sandbox_endpoints\\\":{\\\"url\\\":\\\"https://localhost:9443/am/" + context + "/" + apiName + "/v1/api/\\\",\\\"config\\\":null},\\\"endpoint_type\\\":\\\"http\\\"}";

    return endPointConfigJSON;
    // return JSON.stringify(sampleObject);
  }
}
