import { ref } from 'vue';
import { getPreviewToken } from '../utils/helper';
import { useCraft } from './useApi';

export type ElementType = 'addresses' | 'assets' | 'entries' | 'users';
export type ExecutionMethods = 'all' | 'one'

// Common query parameters shared by all element types, including allowed default methods
export interface CommonQueryParams {
  elementType: ElementType;
  one?: string;
  all?: string;
  id?: number;
  limit?: number;
  status?: string;
  offset?: number;
  orderBy?: string;
  fields?: string | string[];
}

// Specific query parameters for each element type
export interface AddressQueryParams {
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  locality?: string;
  organization?: string;
  fullName?: string;
}

export interface AssetQueryParams {
  volume?: string;
  kind?: string;
  filename?: string;
  site?: string;
  siteId?: number;
}

export interface EntryQueryParams {
  slug?: string;
  uri?: string | string[];
  section?: string;
  postDate?: string;
  site?: string;
  siteId?: number;
}

export interface UserQueryParams {
  group?: string;
  groupId?: number;
  email?: string;
  fullName?: string;
  hasPhoto?: boolean;
}

// Merge Queryparams for better dx
export type MergedQueryParams = CommonQueryParams & AddressQueryParams & AssetQueryParams & EntryQueryParams & UserQueryParams;

// Common query methods shared by all element types, including allowed default methods
export interface CommonQueryBuilder {
  id: (id: number) => this;
  limit: (limit: number) => this;
  status: (status: string) => this;
  offset: (offset: number) => this;
  orderBy: (orderBy: string) => this;
  fields: (fields: string | string[]) => this;
  buildUrl: (value: ExecutionMethods) => string;
}

// Element-specific query builder methods
export interface AddressQueryBuilder extends CommonQueryBuilder {
  addressLine1: (value: string) => this;
  addressLine2: (value: string) => this;
  addressLine3: (value: string) => this;
  locality: (value: string) => this;
  organization: (value: string) => this;
  fullName: (value: string) => this;
}

export interface AssetQueryBuilder extends CommonQueryBuilder {
  volume: (value: string) => this;
  kind: (value: string) => this;
  filename: (value: string) => this;
  site: (value: string) => this;
  siteId: (value: number) => this;
}

export interface EntryQueryBuilder extends CommonQueryBuilder {
  slug: (value: string) => this;
  uri: (value: string | string[]) => this;
  section: (value: string) => this;
  postDate: (value: string) => this;
  site: (value: string) => this;
  siteId: (value: number) => this;
}

export interface UserQueryBuilder extends CommonQueryBuilder {
  group: (value: string) => this;
  groupId: (value: number) => this;
  email: (value: string) => this;
  fullName: (value: string) => this;
  hasPhoto: (value: boolean) => this;
}

// Mapping from ElementType to its specific QueryBuilder
export interface QueryBuilderMap {
  addresses: AddressQueryBuilder;
  assets: AssetQueryBuilder;
  entries: EntryQueryBuilder;
  users: UserQueryBuilder;
}

// Generic implementation of the function
export function useCraftUrlBuilder<T extends ElementType>(
  elementType: T,
): QueryBuilderMap[T] {

  const defaultParams: MergedQueryParams = {
    elementType: 'entries'
  }
  const params = ref<MergedQueryParams>(defaultParams);
  params.value.elementType = elementType;
  const { baseUrl, debug } = useCraft()

  // Common methods shared by all element types, including allowed default methods
  const commonBuilder = {
    id(id) {
      params.value.id = id;
      return this;
    },
    limit(limit) {
      params.value.limit = limit;
      return this;
    },
    status(status) {
      params.value.status = status;
      return this;
    },
    offset(offset) {
      params.value.offset = offset;
      return this;
    },
    orderBy(orderBy) {
      params.value.orderBy = orderBy;
      return this;
    },
    fields(fields) {
      params.value.fields = fields;
      return this;
    },
    buildUrl(value) {
      if (value === 'all') {
        params.value.one = undefined;
        params.value.all = '1'
      } else {
        params.value.one = '1';
        params.value.all = undefined
      }

      /* TODO: add more error handling */
      const queryParams = Object.fromEntries(
        Object.entries(params.value)
          .filter(([_, value]) => value !== undefined && value !== null && value != '')
          .map(([key, value]) => [key, String(value)]),
      );

      const queryString = new URLSearchParams(queryParams).toString();
      const previewToken = getPreviewToken()
      const url = `${baseUrl}/v1/api/customQuery?${queryString}${previewToken ? '&token=' + previewToken : ''}`
      if(debug) {
        console.log('The built url is: ' + url)
      }
      
      return url;
    }
  } as QueryBuilderMap[T];;

  // Element-specific methods based on elementType
  if (elementType === 'addresses') {
    return {
      ...commonBuilder,
      addressLine1(value) {
        params.value.addressLine1 = value;
        return this;
      },
      addressLine2(value) {
        params.value.addressLine2 = value;
        return this;
      },
      addressLine3(value) {
        params.value.addressLine3 = value;
        return this;
      },
      locality(value) {
        params.value.locality = value;
        return this;
      },
      organization(value) {
        params.value.organization = value;
        return this;
      },
      fullName(value) {
        params.value.fullName = value;
        return this;
      },
    } as QueryBuilderMap[T];
  }

  if (elementType === 'assets') {
    return {
      ...commonBuilder,
      volume(value) {
        params.value.volume = value;
        return this;
      },
      kind(value) {
        params.value.kind = value;
        return this;
      },
      filename(value) {
        params.value.filename = value;
        return this;
      },
      site(value) {
        params.value.site = value;
        return this;
      },
      siteId(value) {
        params.value.siteId = value;
        return this;
      },
    } as QueryBuilderMap[T];
  }

  if (elementType === 'entries') {
    return {
      ...commonBuilder,
      slug(value) {
        params.value.slug = value;
        return this;
      },
      uri(value) {
        params.value.uri = Array.isArray(value)
          ? value.filter((value) => value !== '').join('/')
          : value;
        return this;
      },
      section(value) {
        params.value.section = value;
        return this;
      },
      postDate(value) {
        params.value.postDate = value;
        return this;
      },
      site(value) {
        params.value.site = value;
        return this;
      },
      siteId(value) {
        params.value.siteId = value;
        return this;
      },
    } as QueryBuilderMap[T];
  }

  if (elementType === 'users') {
    return {
      ...commonBuilder,
      group(value) {
        params.value.group = value;
        return this;
      },
      groupId(value) {
        params.value.groupId = value;
        return this;
      },
      email(value) {
        params.value.email = value;
        return this;
      },
      fullName(value) {
        params.value.fullName = value;
        return this;
      },
      hasPhoto(value) {
        params.value.hasPhoto = value;
        return this;
      },
    } as QueryBuilderMap[T];
  }

  throw new Error(`Unsupported element type: ${elementType}`);
}
