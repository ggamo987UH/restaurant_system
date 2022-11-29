import Options from "./options";
import { render, screen } from "@testing-library/react";

describe("Options", () => {
    it("renders without crashing", () => {
        render(<Options />);
    });
    }
);
