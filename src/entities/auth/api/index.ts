import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/dist/query/react";
import { RegistrationUserBody } from "../model";
import notify from "@/app/providers/toaster/lib/notify";
import { CustomError } from "@/app/helpers/types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://hackathon.venkon.uz/",
    responseHandler: async (response) => {
      const result = (await response.json()) as
        | {
            error: { code: number; msg: string };
            success: boolean;
          }
        | {
            data: unknown;
            success: boolean;
          };
      if ("error" in result) {
        notify(result.error.msg, "error");
        return Promise.reject(result.error);
      }
      return result;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  endpoints: (builder) => ({
    userRegistration: builder.mutation<
      { authToken: string },
      RegistrationUserBody
    >({
      query: (body) => ({
        method: "post",
        url: "exec?action=registration",
        body,
      }),
    }),
    authWithPassword: builder.mutation<
      { authToken: string; email: string },
      { email: string; password: string }
    >({
      query: (body) => ({
        method: "post",
        url: "exec?action=auth",
        body,
      }),
    }),
  }),
});

export const { useUserRegistrationMutation, useAuthWithPasswordMutation } =
  authApi;
