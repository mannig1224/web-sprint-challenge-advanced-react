import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render, screen } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from "@testing-library/user-event";

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
    render(<CheckoutForm/>);
});

test("shows success message on submit with form details", async () => {
    render(<CheckoutForm/>);

    const firstNameInput = screen.getByLabelText(/first Name/i);
    const lastNameInput = screen.getByLabelText(/last Name/i);
    const addressInput = screen.getByLabelText(/Address:/i);
    const cityInput = screen.getByLabelText(/City:/i);
    const stateInput = screen.getByLabelText(/State:/i);
    const zipInput = screen.getByLabelText(/Zip:/i);
    const button = screen.getByRole("button");

    userEvent.type(firstNameInput, 'Manny');
    userEvent.type(lastNameInput, 'Gatica');
    userEvent.type(addressInput, '1151 S 1700 East');
    userEvent.type(cityInput, 'Spanish Fork');
    userEvent.type(stateInput, 'UT');
    userEvent.type(zipInput, '84660');
    userEvent.click(button);

    const dataMessage = screen.getByTestId('successMessage');
    const nameOutput = screen.getByTestId('name');
    const streetOutput = screen.getByTestId('street');
    const addressOutput = screen.getByTestId('address');

    expect(dataMessage).toBeInTheDocument();
    expect(nameOutput).toHaveTextContent("Manny Gatica");
    expect(streetOutput).toHaveTextContent('1151 S 1700 E');
    expect(addressOutput).toHaveTextContent(/SPANISH FORK, UT 84660/i);
    
});
