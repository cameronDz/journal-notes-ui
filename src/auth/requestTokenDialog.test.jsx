import React from "react";
import { Provider } from "react-redux";
import { fireEvent, queryByText, render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { configureStore } from "../state/store";
import RequestTokenDialog from "./requestTokenDialog";

const urlLiveness = "https://jwt-auth-access-api.herokuapp.com/liveness";
const urlToken = "https://jwt-auth-access-api.herokuapp.com/token";
const server = setupServer(
  rest.post(urlLiveness, (_req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.post(urlToken, (req, res, ctx) => {
    if (req.body.username === "dog" && req.body.password === "good") {
      return res(ctx.status(201), ctx.json({ token: "abc-123" }));
    } else {
      return res(ctx.status(401), ctx.json({}));
    }
  })
);

const wrapper = ({ children }) => {
  return <Provider store={configureStore()}>{children}</Provider>;
};

describe("# RequestTokenDialog tests", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("## 01 - show request dialog, sign in button is disabled", async () => {
    render(<RequestTokenDialog isOpen={true} />, { wrapper });
    expect(await screen.findByTitle("sign in")).toBeDisabled();
  });

  it("## 02 - show request dialog, cancel button calls close callback", async () => {
    const mockCb = jest.fn();
    const opts = { wrapper };
    render(<RequestTokenDialog isOpen={true} onClose={mockCb} />, opts);

    fireEvent.click(await screen.findByTitle("Cancel"));
    expect(mockCb).toBeCalledTimes(1);
  });

  it("## 03 - enter username and password, signin enabled", async () => {
    render(<RequestTokenDialog isOpen={true} />, { wrapper });

    const textFieldName = await screen.findByLabelText("Username");
    fireEvent.change(textFieldName, { target: { value: "cam" } });

    const textFieldPass = await screen.findByLabelText("Password");
    fireEvent.change(textFieldPass, { target: { value: "pass" } });

    expect(await screen.findByTitle("sign in")).toBeEnabled();
  });

  it("## 04 - enter valid username and password and press enter, see success message", async () => {
    render(<RequestTokenDialog isOpen={true} />, { wrapper });

    const textFieldName = await screen.findByLabelText("Username");
    fireEvent.change(textFieldName, { target: { value: "dog" } });

    const textFieldPass = await screen.findByLabelText("Password");
    fireEvent.change(textFieldPass, { target: { value: "good" } });

    const btnSignIn = await screen.findByTitle("sign in");
    fireEvent.click(btnSignIn);

    const successDisplay = "Successfully validated credentials!";
    expect(await screen.findByText(successDisplay)).toBeInTheDocument();
  });

  it("## 05 - enter valid username and password and press enter, see success message", async () => {
    render(<RequestTokenDialog isOpen={true} />, { wrapper });

    const textFieldName = await screen.findByLabelText("Username");
    fireEvent.change(textFieldName, { target: { value: "dog" } });

    const textFieldPass = await screen.findByLabelText("Password");
    fireEvent.change(textFieldPass, { target: { value: "good" } });

    const btnSignIn = await screen.findByTitle("sign in");
    fireEvent.click(btnSignIn);

    const successDisplay = "Successfully validated credentials!";
    await screen.findByText(successDisplay);

    const btnClear = await screen.findByTitle("clear");
    fireEvent.click(btnClear);

    expect(await screen.queryByText(successDisplay)).not.toBeInTheDocument();
  });

  it("## 06 - enter invalid username and password and press enter, see error message", async () => {
    const mockCb = jest.fn();
    const { rerender } = render(
      <RequestTokenDialog isOpen={true} onClose={mockCb} />,
      { wrapper }
    );

    const textFieldName = await screen.findByLabelText("Username");
    fireEvent.change(textFieldName, { target: { value: "cat" } });

    const textFieldPass = await screen.findByLabelText("Password");
    fireEvent.change(textFieldPass, { target: { value: "bad" } });

    const btnSignIn = await screen.findByTitle("sign in");
    fireEvent.click(btnSignIn);

    const errorDisplay = "Unable to validate credentials. Please try again!";
    expect(await screen.findByText(errorDisplay)).toBeInTheDocument();

    const btnCancel = await screen.findByTitle("Cancel");
    fireEvent.click(btnCancel);
    expect(mockCb).toBeCalledTimes(1);

    rerender(<RequestTokenDialog isOpen={false} onClose={mockCb} />);
  });
});
