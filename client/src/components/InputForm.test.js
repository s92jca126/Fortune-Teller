import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import InputForm from "./InputForm";

describe("InputForm Component", () => {
  it("renders all form fields and the submit button", () => {
    render(
      <MemoryRouter>
        <InputForm />
      </MemoryRouter>
    );

    // Check if all form fields are rendered
    expect(screen.getByLabelText(/Date of Birth:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Time of Birth:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Place of Birth:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Question:/i)).toBeInTheDocument();

    // Check if the submit button is rendered
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });
});
