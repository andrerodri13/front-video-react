import {render} from "@testing-library/react";
import {CastMemberForm} from "./CastMemberForm";
import {BrowserRouter} from "react-router-dom";

const Props = {
    castMember: {
        id: "1",
        name: "Teste",
        type: 1,
        deleted_at: null,
        created_at: "2021-10-01T00:00:00.000000Z",
        updated_at: "2021-10-01T00:00:00.000000Z",
    },
    isDisabled: false,
    isLoading: false,
    handdleSubmit: jest.fn(),
    handleChange: jest.fn(),
}
describe("CastMemberForm", () => {
    it("Should render castMember form correcty", () => {
       const {asFragment} = render(<CastMemberForm {...Props} />, {
           wrapper: BrowserRouter,
       })

        expect(asFragment()).toMatchSnapshot();
    });

    it("Should render castMember form with loading state", () => {
        const {asFragment} = render(<CastMemberForm {...Props} isLoading={true} />, {
            wrapper: BrowserRouter,
        })

        expect(asFragment()).toMatchSnapshot();
    })

    it("Should render castMember form with disabled and loading  state", () => {
        const {asFragment} = render(<CastMemberForm {...Props} isDisabled={true} isLoading={true} />, {
            wrapper: BrowserRouter,
        })

        expect(asFragment()).toMatchSnapshot();
    })
});