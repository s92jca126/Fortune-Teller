import { render, screen } from "@testing-library/react";
import BirthForm from "./BirthForm";

describe("BirthForm Component", () => {
  it("renders all form fields and the submit button", () => {
    render(<BirthForm />);

    // Check if all form fields are rendered
    expect(screen.getByLabelText(/Date of Birth:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Time of Birth:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Place of Birth:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender:/i)).toBeInTheDocument();

    // Check if the submit button is rendered
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });
});
