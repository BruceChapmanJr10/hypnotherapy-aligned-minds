import { render, screen, fireEvent } from "@testing-library/react";
import ServiceCard from "../ServiceCard";

/* ---------------- MOCK SERVICE DATA ---------------- */
/* Simulates CMS service object */

const mockService = {
  id: "1",
  title: "Hypnotherapy Session",
  description: "Deep relaxation session",
  price: "$120",
  image: "",
  active: true,
};

/* ---------------- TEST SUITE ---------------- */

describe("ServiceCard Component", () => {
  /* Test 1 — Renders title */
  it("renders service title", () => {
    render(<ServiceCard service={mockService} onClick={() => {}} />);

    expect(screen.getByText("Hypnotherapy Session")).toBeInTheDocument();
  });

  /* Test 2 — Renders button */
  it("renders More Info button", () => {
    render(<ServiceCard service={mockService} onClick={() => {}} />);

    expect(
      screen.getByRole("button", { name: /more info/i }),
    ).toBeInTheDocument();
  });

  /* Test 3 — Click handler fires */
  it("calls onClick when button is clicked", () => {
    const handleClick = jest.fn();

    render(<ServiceCard service={mockService} onClick={handleClick} />);

    const button = screen.getByRole("button", {
      name: /more info/i,
    });

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
