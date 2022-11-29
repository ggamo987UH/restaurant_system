import Login from "./login";
import { render, screen } from "@testing-library/react";

describe("Login", () => {
    it("renders without crashing", () => {
        render(<Login />);
    });
    }
);
