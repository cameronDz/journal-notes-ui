import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import NavIcon from "./navIcon";

describe("# NavIcon tests", () => {
  it("## 01 - find icon by role and click, callback sends back name", async () => {
    const mockFunc = jest.fn();
    const name = "test-name";
    render(<NavIcon name={name} onClick={mockFunc} />);
    const btn = await screen.findByRole("button");
    fireEvent.click(btn);
    expect(mockFunc).toBeCalledWith(name);
  });

  it("## 02 -find icon by title and click, callback sends back name", async () => {
    const mockFunc = jest.fn();
    const name = "Test title";
    render(<NavIcon name={name} onClick={mockFunc} />);
    const btn = await screen.findByTitle(name);
    fireEvent.click(btn);
    expect(mockFunc).toBeCalledWith(name);
  });
});
