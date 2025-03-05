/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient } from "@angular/common/http";
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from "@angular/core";

import { ApiConfiguration, ApiConfigurationParams } from "./api-configuration";
import { ChatService } from "./services/chat.service";
import { MessageService } from "./services/message.service";
import { UserService } from "./services/user.service";

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [MessageService, ChatService, UserService, ApiConfiguration],
})
export class ApiModule {
  static forRoot(
    params: ApiConfigurationParams
  ): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params,
        },
      ],
    };
  }

  constructor(
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error(
        "ApiModule is already loaded. Import in your base AppModule only."
      );
    }
    if (!http) {
      throw new Error(
        "You need to import the HttpClientModule in your AppModule! \n" +
          "See also https://github.com/angular/angular/issues/20575"
      );
    }
  }
}
