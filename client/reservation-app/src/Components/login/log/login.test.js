import Login from "./login";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Login", () => {
    it("renders without crashing", () => {
        render(<Login />);
    });
}
);