import { createQueryKeyStore } from "@lukemorales/query-key-factory";

export const queries = createQueryKeyStore({
  auth: {
    loginPage: {
      queryKey: null,
    },
    session: (sessionId: string) => ({
      queryKey: [sessionId],
    }),
  },
});

export type QueryKeys = typeof queries;

