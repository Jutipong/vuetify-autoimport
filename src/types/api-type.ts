/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Customer {
  /** @format uuid */
  id?: string;
  code?: string | null;
  name?: string | null;
  /** @format int32 */
  age?: number | null;
  email?: string | null;
  isActive?: boolean | null;
}

export interface CustomerAutocompleteRequest {
  textSearch?: string | null;
  idInit?: string[] | null;
  /** @format int32 */
  pageSize?: number | null;
}

export interface CustomerAutocompleteResponse {
  /** @format uuid */
  id?: string;
  text?: string | null;
}

export interface CustomerCreateRequest {
  code?: string | null;
  name?: string | null;
  /** @format int32 */
  age?: number | null;
  email?: string | null;
}

export interface CustomerDapperRequest {
  name?: string | null;
}

export interface CustomerInquiryRequest {
  name?: string | null;
}

export interface CustomerListResult {
  isSuccess?: boolean;
  isFailure?: boolean;
  error?: Error;
  value?: Customer[] | null;
}

export interface CustomerUpdateRequest {
  /** @format uuid */
  id?: string;
  code?: string | null;
  name?: string | null;
  /** @format int32 */
  age?: number | null;
  email?: string | null;
}

export interface Error {
  code?: string | null;
  message?: string | null;
}
