import {CreateCastMember} from "./CreateCastMember";
import {renderWithProviders} from "../../utils/test-utils";


describe("CreateCastMember", () => {
   it("should render correctly", () => {
       const {asFragment} = renderWithProviders(<CreateCastMember/>)
       expect(asFragment()).toMatchSnapshot();
   });
});