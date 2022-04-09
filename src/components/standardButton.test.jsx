import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import StandardButton from "./standardButton";

describe("# StandardButton tests", () => {
  it("## 01 - find btn by role and click, callback invoked", async () => {
    const mockFunc = jest.fn();
    render(<StandardButton onClick={mockFunc} />);
    const btn = await screen.findByRole("button");
    fireEvent.click(btn);
    expect(mockFunc).toBeCalledTimes(1);
  });

  it("## 02 - find find button by role when disabled, callback not called", async () => {
    const mockFunc = jest.fn();
    render(<StandardButton disabled={true} onClick={mockFunc} />);
    const btn = await screen.findByRole("button");
    fireEvent.click(btn);
    expect(mockFunc).toBeCalledTimes(0);
  });
});
