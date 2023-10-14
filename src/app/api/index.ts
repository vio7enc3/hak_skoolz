import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query/react';
import { RootState } from '../store';
import {
  AffiliatedItem,
  SchedulesToCreate,
  BeneficiaryItem,
  DeliveryTypes,
  District,
  EmployeeItem,
  GetAffiliatedResponse,
  Good,
  Region,
  Unit,
  SourceOfFinance,
  ArrayOfSchedules,
  Schedule,
  Invitation,
  PlanScheduleProduct,
  AllPermissions,
  Country,
  FullName,
  PhisRequest,
  RequestItem,
  DefaultDictResponse,
  AllCategories,
  MinFinProduct,
  MinFinProductInfo,
} from './model';
import { DefaultResponse, RequestWithPagination, ResponseWithPagination } from '../utils/types';
import { PersonType } from '../constants';
import { Company, User } from '@/entities/session/model/types';
import { logout } from '@/entities/session';
import { CustomError } from '../helpers/types';
import i18n from '../i18n';
import notify from '../providers/toaster/lib/notify';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).session;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Accept-Language', i18n.language);
    return headers;
  },
  responseHandler: async (response) => {
    if (response.status === 401) {
      return Promise.reject();
    }
    const result = (await response.json()) as
      | {
          error: { code: number; msg: string };
          success: boolean;
        }
      | {
          data: unknown;
          success: boolean;
        };

    return result;
  },
});

//@ts-ignore
export const customFetchBase: BaseQueryFn<string | FetchArgs, unknown, CustomError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error && 'status' in result.error && result.error.status === 401) {
    const t = i18n.t.bind(i18n);
    api.dispatch(logout());
    notify(t('session_expired'), 'error');
    return result;
  }
  return result;
};

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getCompanyInfo: builder.mutation<DefaultResponse<Company>, { unique: number }>({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=getLegalEntityData',
        body,
      }),
    }),
    editCompanyInfo: builder.mutation<unknown, Partial<Company>>({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=editLegalEntityData',
        body,
      }),
    }),
    getRegions: builder.query<DefaultResponse<Region[]>, {}>({
      query: () => ({
        url: 'exec?action=getRegions',
      }),
    }),
    getDistricts: builder.query<DefaultResponse<District[]>, { regionId: number }>({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=getDistricts',
        body,
      }),
    }),
    getAffiliatedList: builder.query<
      ResponseWithPagination<AffiliatedItem>,
      RequestWithPagination<{ unique: number }>
    >({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=getLegalEntityAffiliates',
        body,
      }),
    }),
    addAffiliated: builder.mutation({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=addLegalEntityAffiliate',
        body,
      }),
    }),
    editAffiliated: builder.mutation({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=editLegalEntityAffiliate',
        body,
      }),
    }),
    getAffiliatedByUnique: builder.mutation<GetAffiliatedResponse, { unique: number }>({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=getLegalEntityAffiliate',
        body,
      }),
    }),
    getBeneficiariesList: builder.query<
      ResponseWithPagination<BeneficiaryItem>,
      RequestWithPagination<{ unique: number }>
    >({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=getBeneficiaries',
        body,
      }),
    }),
    addBeneficiary: builder.mutation({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=addBeneficiaries',
        body,
      }),
    }),
    editBeneficiary: builder.mutation({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=editBeneficiaries',
        body,
      }),
    }),
    deleteBeneficiary: builder.mutation<unknown, { unique: number }>({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=deleteBeneficiaries',
        body,
      }),
    }),
    getBeneficiaryByUnique: builder.mutation<BeneficiaryItem, { unique: number }>({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=getBeneficiary',
        body,
      }),
    }),
    getEmployeesList: builder.query<
      ResponseWithPagination<EmployeeItem>,
      RequestWithPagination<{ unique?: number }>
    >({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=getEmployees',
        body,
      }),
    }),
    getEmployeesRequestsList: builder.query({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=getLegalEntityInvitation',
        body,
      }),
    }),
    deleteAffiliated: builder.mutation<unknown, { unique: number }>({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=deleteLegalEntityAffiliate',
        body,
      }),
    }),
    getInvitation: builder.query<unknown, { unique: number; type: PersonType }>({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=getInvitation',
        body,
      }),
    }),
    prolongOffer: builder.mutation<unknown, { unique: number }>({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=prolongOffer',
        body,
      }),
    }),
    deleteOffer: builder.mutation<unknown, { unique: number; signature: string }>({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=deleteOffer',
        body,
      }),
    }),
    getAllUnits: builder.query<DefaultResponse<Unit[]>, {}>({
      query: () => ({
        method: 'post',
        url: 'exec?action=getAllUnits',
      }),
    }),
    getAllGoods: builder.query<
      ResponseWithPagination<Good>,
      RequestWithPagination<{ unique?: number; search?: string }>
    >({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=getAllGoods',
        body,
      }),
    }),
    searchProduct: builder.query<MinFinProduct[], { search: string }>({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=productSearch',
        body,
      }),
    }),
    getProduct: builder.query<MinFinProductInfo[], { code: string; mode: 'all' | 'lite' }>({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=getProduct',
        body,
      }),
    }),
    getSourceOfFinance: builder.query<Omit<DefaultResponse<SourceOfFinance[]>, 'success'>, {}>({
      query: () => ({
        url: 'exec?action=getFinanceSources',
      }),
    }),
    getDeliveryTypes: builder.query<Omit<DefaultResponse<DeliveryTypes[]>, 'success'>, {}>({
      query: () => ({
        url: 'exec?action=getDeliveryTypes',
      }),
    }),
    addASchedule: builder.mutation<
      { success: boolean },
      { unique: number; schedules: SchedulesToCreate[] }
    >({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=addPlanSchedules',
        body,
      }),
    }),
    publishASchedule: builder.mutation<
      { success: boolean },
      { unique: number; schedules: SchedulesToCreate[] }
    >({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=publishPlanSchedule',
        body,
      }),
    }),
    getAllSchedules: builder.query<
      Omit<ResponseWithPagination<ArrayOfSchedules>, 'success'>,
      RequestWithPagination<{ unique: number; year?: number; quarter: number }>
    >({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=getPlanSchedules',
        body,
      }),
    }),
    getAllSchedulesNoAuth: builder.query<
      Omit<ResponseWithPagination<ArrayOfSchedules>, 'success'>,
      RequestWithPagination<{ year?: number; quarter: number }>
    >({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=getPlanSchedulesNoAuth',
        body,
      }),
    }),
    getAllCategories: builder.query<
      Omit<ResponseWithPagination<AllCategories>, 'success'>,
      RequestWithPagination<{}>
    >({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=getAllCategories',
        body,
      }),
    }),
    getASchedule: builder.query<DefaultResponse<Schedule>, { unique: number }>({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=getPlanSchedule',
        body,
      }),
    }),
    getRequestsJur: builder.query<
      ResponseWithPagination<RequestItem>,
      RequestWithPagination<{ unique?: number; type: PersonType.JUR }>
    >({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=getRequests',
        body: {
          ...body,
          type: '1',
        },
      }),
    }),
    sendInvitation: builder.mutation<
      DefaultResponse<{ success: boolean }>,
      { unique: number; phone: string; pinfl: string }
    >({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=sendInvitation',
        body,
      }),
    }),
    getInvitations: builder.query<
      ResponseWithPagination<Invitation>,
      RequestWithPagination<{ unique?: number; type: PersonType }>
    >({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=getInvitations',
        body,
      }),
    }),
    getPlanScheduleProducts: builder.query<
      ResponseWithPagination<PlanScheduleProduct>,
      RequestWithPagination<{ legalEntity: number }>
    >({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=getPlanScheduleProducts',
        body,
      }),
      merge: (currentCache, newData) => {
        currentCache.push(...newData);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getSpecialConditions: builder.query<DefaultResponse<AuctionCondition[]>, {}>({
      query: () => ({
        method: 'post',
        url: 'exec?action=getSpecialConditions',
      }),
    }),
    getAllPermissions: builder.query<Omit<DefaultResponse<AllPermissions[]>, 'success'>, {}>({
      query: () => ({
        url: 'exec?action=getAllPermissions',
      }),
    }),
    setInvitationStatus: builder.mutation<
      DefaultResponse<{ status: boolean }>,
      { unique: number; status: string }
    >({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=setInvitationStatus',
        body,
      }),
    }),
    setRequestStatus: builder.mutation<
      DefaultResponse<{ status: boolean }>,
      { unique: number; status: string }
    >({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=setRequestStatus',
        body,
      }),
    }),
    getCountries: builder.query<Omit<DefaultResponse<Country[]>, 'success'>, {}>({
      query: () => ({
        url: 'exec?action=getCountries',
      }),
    }),
    getFullNameByPinfl: builder.query<FullName, { pinfl: string }>({
      query: (body) => ({
        url: `exec?action=getFullNameByPinfl&p=${body.pinfl}`,
      }),
    }),
    editIndividual: builder.mutation<DefaultResponse<User>, {}>({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=editIndividual',
        body,
      }),
    }),
    getIndividualAffiliates: builder.query<
      ResponseWithPagination<AffiliatedItem>,
      RequestWithPagination<{ unique: number }>
    >({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=getIndividualAffiliates',
        body,
      }),
      providesTags: ['IndAff'],
    }),
    deleteindividualAffiliate: builder.mutation({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=deleteindividualAffiliate',
        body,
      }),
      invalidatesTags: ['IndAff'],
    }),
    addIndividualAffiliate: builder.mutation({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=addIndividualAffiliate',
        body,
      }),
      invalidatesTags: ['IndAff'],
    }),
    getIndividualAffiliate: builder.mutation({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=getIndividualAffiliate',
        body,
      }),
    }),
    editIndividualAffiliate: builder.mutation({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=editIndividualAffiliate',
        body,
      }),
      invalidatesTags: ['IndAff'],
    }),
    getRequestsPhis: builder.query<
      ResponseWithPagination<PhisRequest>,
      RequestWithPagination<{ unique: number; type: PersonType.PHYS }>
    >({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=getRequests',
        body: {
          ...body,
          type: '2',
        },
      }),
      providesTags: ['Request'],
    }),
    sendRequest: builder.mutation<
      { success: boolean },
      {
        unique: number;
        tin: string;
      }
    >({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=sendRequest',
        body,
      }),
      invalidatesTags: ['Request'],
    }),
    getCurrencies: builder.query<DefaultResponse<{ name: string; code: string }[]>, {}>({
      query: () => ({
        method: 'post',
        url: 'exec?action=getCurrencies',
      }),
    }),
    getPaymentOrders: builder.query<DefaultResponse<DefaultDictResponse[]>, {}>({
      query: () => ({
        method: 'post',
        url: 'exec?action=getPaymentOrders',
      }),
    }),
    getLanguages: builder.query<DefaultResponse<{ code: string; name: string }[]>, {}>({
      query: () => ({
        method: 'post',
        url: 'exec?action=getLanguages',
      }),
    }),
    getBalance: builder.query<
      { availableBalance: number; blockedBalance: number },
      { unique: number }
    >({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=getBalance',
        body,
      }),
    }),
    sendInvitationCode: builder.mutation<{ success: boolean }, { unique: number; phone: string }>({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=sendInvitationCode',
        body,
      }),
    }),
    sendInvitationCodeConfrim: builder.mutation<
      { success: boolean },
      { unique: number; otp: string }
    >({
      query: (body) => ({
        method: 'post',
        url: 'exec?action=sendInvitationCodeConfrim',
        body,
      }),
    }),
  }),
  tagTypes: ['IndAff', 'Request'],
});

export const {
  useGetAffiliatedListQuery,
  useAddAffiliatedMutation,
  useGetCompanyInfoMutation,
  useGetRegionsQuery,
  useLazyGetRegionsQuery,
  useLazyGetDistrictsQuery,
  useGetAffiliatedByUniqueMutation,
  useGetBeneficiariesListQuery,
  useAddBeneficiaryMutation,
  useDeleteBeneficiaryMutation,
  useGetBeneficiaryByUniqueMutation,
  useEditBeneficiaryMutation,
  useGetEmployeesListQuery,
  useGetEmployeesRequestsListQuery,
  useDeleteAffiliatedMutation,
  useGetInvitationsQuery,
  useEditCompanyInfoMutation,
  useEditAffiliatedMutation,
  useProlongOfferMutation,
  useDeleteOfferMutation,
  useGetAllUnitsQuery,
  useLazyGetAllUnitsQuery,
  useGetAllGoodsQuery,
  useGetSourceOfFinanceQuery,
  useLazyGetSourceOfFinanceQuery,
  useGetDeliveryTypesQuery,
  useLazyGetDeliveryTypesQuery,
  useAddAScheduleMutation,
  useGetAllSchedulesQuery,
  useGetAScheduleQuery,
  useLazyGetAScheduleQuery,
  useGetRequestsJurQuery,
  useGetInvitationQuery,
  useSendInvitationMutation,
  useGetPlanScheduleProductsQuery,
  useLazyGetPlanScheduleProductsQuery,
  useGetSpecialConditionsQuery,
  useGetAllPermissionsQuery,
  useLazyGetAllPermissionsQuery,
  useSetInvitationStatusMutation,
  useSetRequestStatusMutation,
  useGetCountriesQuery,
  useLazyGetCountriesQuery,
  useGetFullNameByPinflQuery,
  useEditIndividualMutation,
  useGetIndividualAffiliatesQuery,
  useDeleteindividualAffiliateMutation,
  useAddIndividualAffiliateMutation,
  useGetIndividualAffiliateMutation,
  useEditIndividualAffiliateMutation,
  useGetRequestsPhisQuery,
  useSendRequestMutation,
  useGetCurrenciesQuery,
  useLazyGetCurrenciesQuery,
  useGetPaymentOrdersQuery,
  useLazyGetPaymentOrdersQuery,
  useGetLanguagesQuery,
  useLazyGetLanguagesQuery,
  useLazyGetAllGoodsQuery,
  useGetAllCategoriesQuery,
  usePublishAScheduleMutation,
  useLazyGetAllCategoriesQuery,
  useGetAllSchedulesNoAuthQuery,
  useLazyGetAllSchedulesQuery,
  useLazyGetAllSchedulesNoAuthQuery,
  useLazyGetSpecialConditionsQuery,
  useLazyGetBalanceQuery,
  useSendInvitationCodeMutation,
  useSendInvitationCodeConfrimMutation,
  useLazySearchProductQuery,
  useLazyGetProductQuery,
  useSearchProductQuery,
  useGetProductQuery,
  useGetDistrictsQuery,
} = mainApi;
