import Calendar from "./calendar";
import { render } from "react-dom";

describe("Calendar", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        render(<Calendar />, div);
    });
    }
);
