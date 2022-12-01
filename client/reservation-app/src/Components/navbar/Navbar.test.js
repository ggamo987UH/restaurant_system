import Navbar from "./Navbar";
import { render, screen } from "@testing-library/react";

describe("Navbar", () => {
    it("renders without crashing", () => {
        render(<Navbar />);
    });
    }
);