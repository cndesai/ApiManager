import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetApisComponent } from './get-apis/get-apis.component';
import { HomeComponent } from './home/home.component';
import { GetApiDetailsComponent } from './get-api-details/get-api-details.component';
import { CreateApiComponent } from './create-api/create-api.component';

const routes: Routes = [

	/** Setting default route - set path as empty and set the component */
	{ path: '', component: HomeComponent },
	{ path: 'getApis', component: GetApisComponent },
	{ path: 'getApis/:id', component: GetApiDetailsComponent },
	{ path: 'createApi', component: CreateApiComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
