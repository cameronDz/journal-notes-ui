/* eslint-disable prettier/prettier */
import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import { configureStore } from "../state/store";
import RequestTokenDialog from "./requestTokenDialog";

window.fetch = jest.fn();

const wrapper = ({ children }) => {
  return <Provider store={configureStore()}>{children}</Provider>;
};
const livenessResponse = { ok: true, status: 200, json: async () => undefined };

describe("# RequestTokenDialog tests", () => {
  it("## 01 - show request dialog, sign in button is disabled", async () => {
    jest.mocked(window.fetch).mockResolvedValueOnce(livenessResponse);
    render(<RequestTokenDialog isOpen={true} />, { wrapper });
    expect(await screen.findByTitle("sign in")).toBeDisabled();
  });

  it("## 02 - show request dialog, cancel button calls close callback", async () => {
    jest.mocked(window.fetch).mockResolvedValueOnce(livenessResponse);
    const mockCb = jest.fn();
    const opts = { wrapper };
    render(<RequestTokenDialog isOpen={true} onClose={mockCb} />, opts);

    fireEvent.click(await screen.findByTitle("Cancel"));
    expect(mockCb).toBeCalledTimes(1);
  });

  it("## 03 - enter username and password, signin enabled", async () => {
    jest.mocked(window.fetch).mockResolvedValueOnce(livenessResponse);
    render(<RequestTokenDialog isOpen={true} />, { wrapper });

    const textFieldName = await screen.findByLabelText("Username");
    fireEvent.change(textFieldName, { target: { value: "cam" } });

    const textFieldPass = await screen.findByLabelText("Password");
    fireEvent.change(textFieldPass, { target: { value: "pass" } });

    expect(await screen.findByTitle("sign in")).toBeEnabled();
  });

  it("## 04 - enter valid username and password and press enter, see success message", async () => {
    const response = { ok: true, status: 201, json: async () => ({ token: "abc-123" }) };
    jest.mocked(window.fetch)
      .mockResolvedValueOnce(livenessResponse)
      .mockResolvedValueOnce(response);
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
    const response = { ok: true, status: 201, json: async () => ({ token: "abc-123" }) };
    jest.mocked(window.fetch)
      .mockResolvedValueOnce(livenessResponse)
      .mockResolvedValueOnce(response);
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
    const response = { ok: false, status: 401, json: async () => ({ error: true }) };
    jest.mocked(window.fetch)
      .mockResolvedValueOnce(livenessResponse)
      .mockResolvedValueOnce(response);
    const mockCb = jest.fn();
    const { rerender } = render(
      <RequestTokenDialog isOpen={true} onClose={mockCb} />,
      { wrapper },
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
