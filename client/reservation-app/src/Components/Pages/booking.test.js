import Bookings from "./bookings";
import { render, screen } from "@testing-library/react";

describe("Bookings", () => {
    it("renders without crashing", () => {
        render(<Bookings />);
    });
    }
);
