import ModalOptions from "./modal"; 
import {render} from "@testing-library/react";

describe("ModalOptions", () => {
    it("renders without crashing", () => {
        render(<ModalOptions />);
    });
    }
);