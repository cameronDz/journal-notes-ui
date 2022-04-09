import React from "react";
import { render, screen } from "@testing-library/react";
import TagsDisplay from "./tagsDisplay";

describe("# TagsDisplay tests", () => {
  it("## 01 - has not tags, show not content", async () => {
    render(<TagsDisplay />);
    const expected = "No associated tags.";
    expect(await screen.findByText(expected)).toBeInTheDocument();
  });

  it("## 02 - empty tags array, show not content", async () => {
    const tags = [];
    render(<TagsDisplay tags={tags} />);
    const expected = "No associated tags.";
    expect(await screen.findByText(expected)).toBeInTheDocument();
  });

  it("## 03 - single tag in array, shows tag", async () => {
    const tags = ["dogs"];
    render(<TagsDisplay tags={tags} />);
    const expected = "dogs";
    expect(await screen.findByText(expected)).toBeInTheDocument();
  });

  it("## 04 - multiple tags in array, shows comma separated tags", async () => {
    const tags = ["dogs", "pets", "doggos"];
    render(<TagsDisplay tags={tags} />);
    const expected = "dogs, pets, doggos";
    expect(await screen.findByText(expected)).toBeInTheDocument();
  });
});
