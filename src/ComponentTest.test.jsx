import React from "react";
import { describe, expect, test } from "vitest";
import { render,screen, waitFor  } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./app/store";
import {ComponentTest} from "./components/ComponentTest";
const wrapper = (children) => {
  return <Provider store={store}>{children}</Provider>;
};

function setup(jsx) {
  return {
    ...render(wrapper(jsx)),
  };
}


describe("App Test1 ", () => {
  test("Should contain msw response array",async () => {
    setup(<ComponentTest />);
    await screen.findByText(/12345/)
  });
});
