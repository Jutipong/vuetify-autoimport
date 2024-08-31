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

interface Customer {
  /** @format uuid */
  id?: string;
  code?: string | null;
  name?: string | null;
  /** @format int32 */
  age?: number | null;
  email?: string | null;
  isActive?: boolean | null;
}

interface CustomerAutocompleteRequest {
  textSearch?: string | null;
  idInit?: string[] | null;
  /** @format int32 */
  pageSize?: number | null;
}

interface CustomerAutocompleteResponse {
  /** @format uuid */
  id?: string;
  text?: string | null;
}

interface CustomerCreateRequest {
  code?: string | null;
  name?: string | null;
  /** @format int32 */
  age?: number | null;
  email?: string | null;
}

interface CustomerDapperRequest {
  name?: string | null;
}

interface CustomerInquiryRequest {
  name?: string | null;
}

interface CustomerListResult {
  isSuccess?: boolean;
  isFailure?: boolean;
  error?: Error;
  value?: Customer[] | null;
}

interface CustomerUpdateRequest {
  /** @format uuid */
  id?: string;
  code?: string | null;
  name?: string | null;
  /** @format int32 */
  age?: number | null;
  email?: string | null;
}

interface Error {
  code?: string | null;
  message?: string | null;
}
