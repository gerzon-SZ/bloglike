import { beforeAll, afterAll, afterEach } from "vitest";
import { server } from "../mocks/server";
import nodeFetch from "node-fetch";
global.fetch = nodeFetch;
global.Request = nodeFetch.Request;

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

process.on("unhandledRejection", (error) => {
  // eslint-disable-next-line no-undef
  fail(error);
});

process.env.NODE_ENV = "development";
