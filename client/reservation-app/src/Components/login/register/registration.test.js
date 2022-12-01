import Register from "./registration";
import { render, screen } from "@testing-library/react";

describe("Register", () => {
    it("renders without crashing", () => {
        render(<Register />);
    });
    }
);
