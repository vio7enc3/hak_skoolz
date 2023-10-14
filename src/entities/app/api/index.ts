import { CustomError } from "@/app/helpers/types";
import i18n from "@/app/i18n";
import notify from "@/app/providers/toaster/lib/notify";
import { RootState } from "@/app/store";
import { logout } from "@/entities/session";
import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/dist/query/react";
import { Level, LevelTests } from "../model/types";

export const baseQuery = fetchBaseQuery({
  baseUrl: "https://hackathon.venkon.uz/",
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).session;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Accept-Language", i18n.language);
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

// @ts-ignore
export const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  CustomError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (
    result?.error &&
    "status" in result.error &&
    result.error.status === 401
  ) {
    const t = i18n.t.bind(i18n);
    api.dispatch(logout());
    notify(t("session_expired"), "error");
    return result;
  }
  return result;
};

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getLevels: builder.query<{ levels: Level[] }, {}>({
      query: () => ({
        method: "POST",
        url: "exec?action=getLevels",
      }),
    }),
    getLevel: builder.query<LevelTests, number>({
      query: (id) => ({
        method: "POST",
        url: "exec?action=getLevel",
        body: { id },
      }),
    }),
  }),
});

export const { useGetLevelsQuery, useGetLevelQuery } = appApi;
