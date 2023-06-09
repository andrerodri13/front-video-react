import {render} from "@testing-library/react";
import {CategoryForm} from "./CategoryForm";
import {BrowserRouter} from "react-router-dom";
import React from "react";

const Props = {
    category: {
        id: "123",
        name: "Teste",
        is_active: true,
        description: "teste",
        created_at: "2021-10-01T00:00:00.000000Z",
        updated_at: "2021-10-01T00:00:00.000000Z",
        deleted_at: null
    },
    isDisabled: false,
    isLoading: false,
    handdleSubmit: () => {},
    handleChange: () => {},
    handleToggle: () => {},
}

describe('CategoryForm', () => {

    it("should render correctly", () => {
        const {asFragment} = render(<CategoryForm {...Props}/>, {
            wrapper: BrowserRouter
        });

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render Category Form with loading", () => {
        const {asFragment} = render(<CategoryForm {...Props} isLoading={true} isDisabled={true}/>, {
            wrapper: BrowserRouter
        });

        expect(asFragment()).toMatchSnapshot();
    });
});
