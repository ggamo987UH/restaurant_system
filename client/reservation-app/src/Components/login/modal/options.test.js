import Options from "./options";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Options", () => {
    it("renders without crashing", () => {
        render(<Options />);
    });
}
);