import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import LeftNavBar from "./leftNavBar";

describe("# LeftNavBar tests", () => {
  it("## 01 - find icons by role, six total", async () => {
    render(<LeftNavBar />);
    expect(await screen.findAllByRole("button")).toHaveLength(7);
  });

  it("## 02 - find icon by title and click, callback sends back name", async () => {
    const mockFunc = jest.fn();
    const title = "sign-in";
    render(<LeftNavBar onClick={mockFunc} />);
    fireEvent.click(await screen.findByTitle(title));
    expect(mockFunc).toBeCalledWith(title);
  });
});
