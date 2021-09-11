import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ReactDOM from "react-dom";

import Ads from "../Ads";

const MockAds = () => (
  <MemoryRouter>
    <Ads />
  </MemoryRouter>
);

test("Renders in DOM without errors", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MockAds />, div);
});

test("Render Ads component and check title", () => {
  render(<Ads />, { wrapper: MemoryRouter });
  const headingElement = screen.getByText(/Ads/i);
  expect(headingElement).toBeInTheDocument();
});

/* if (mockData.mockGoogleTags.length) {
  test("Ad card Click on existing tag", async () => {
    render(<AdCard ad={mockData.mockGoogleAdWithImg} allTags={mockData.mockGoogleTags} />);
    await fireEvent.click(screen.getByTestId("chip-0"));
    expect(screen.getByTestId("chip-0")).not.toHaveClass("MuiChip-outlined");
  });
} */
