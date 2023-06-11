import {render} from "@testing-library/react";
import {Header} from "./Header"

describe("Header", () => {
    it("Should render correctly", () =>{
        const {asFragment} = render(<Header
            handleDrawerToggle={() => {}}
            theme="dark"
            toggle={() => {}}/>);

        expect(asFragment()).toMatchSnapshot();
    })
})