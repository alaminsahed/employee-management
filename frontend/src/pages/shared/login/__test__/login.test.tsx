import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import Login from "../Login";


describe('Login Component', () => {
    test('renders Login component', () => {
        render(<BrowserRouter><Login /></BrowserRouter>);
        const nameElement = screen.getByRole('textbox', { name: /email address/i });
        expect(nameElement).toBeInTheDocument();
        const passwordElement = screen.getByRole('textbox', { name: /password/i });
        expect(passwordElement).toBeInTheDocument();
        const forgetPasswordElement = screen.getByRole('link', { name: /forget password/i });
        expect(forgetPasswordElement).toBeInTheDocument();
        const loginButtonElement = screen.getByRole('button', { name: /sign in/i });
        expect(loginButtonElement).toBeInTheDocument();
    });

    test('input values in input field', async () => {
        render(<BrowserRouter><Login /></BrowserRouter>);
        const nameElement = screen.getByRole('textbox', { name: /email address/i });
        const passwordElement = screen.getByRole('textbox', { name: /password/i });
        const loginButtonElement = screen.getByRole('button', { name: /sign in/i });

        fireEvent.change(nameElement, { target: { value: 'user03@gmail.com' } });
        fireEvent.change(passwordElement, { target: { value: 'user1234' } });

        fireEvent.click(loginButtonElement);
    });

    test("should route in forget password page", async () => {
        render(<BrowserRouter><Login /></BrowserRouter>);
        const forgetPasswordElement = screen.getByRole('link', { name: /forget password/i });
        fireEvent.click(forgetPasswordElement);

    });

});

