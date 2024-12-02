import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PredictionResult from "./PredictionResult";

// mocks packages that jest cannot handle directly
jest.mock("react-markdown", () => (props) => <div>{props.children}</div>);
jest.mock("rehype-highlight", () => jest.fn());

describe("PredictionResult Component", () => {
  it("renders the chat header and input form", () => {
    render(
      <MemoryRouter
        initialEntries={[
          {
            state: {
              prediction: "this is your prediction",
              birthDataStr: "1990-01-01",
            },
          },
        ]}
      >
        <PredictionResult />
      </MemoryRouter>
    );

    expect(screen.getByText(/Chat with BaZi/i)).toBeInTheDocument();
    expect(screen.getByText("this is your prediction")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Message AI Fortune Teller 🔮/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Send/i)).toBeInTheDocument();
  });
});
