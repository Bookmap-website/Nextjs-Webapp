import { render, screen, fireEvent } from "@testing-library/react";
import Login_page from "@/app/(Auth)/Login/page";

/* =========================================================
   MOCK: useAuth
========================================================= */
const mockLoginSubmit = jest.fn();

jest.mock("@/hooks/Auth/useAuth", () => ({
  useAuth: () => ({
    handleLoginSubmit: mockLoginSubmit,
  }),
}));

/* =========================================================
   MOCK: Input
========================================================= */
jest.mock("@/public/component/Input", () => {
  return function MockInput({ label, value, onChange }: any) {
    return (
      <div>
        <label>{label}</label>
        <input
          data-testid={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  };
});

/* =========================================================
   MOCK: Button
========================================================= */
jest.mock("@/public/component/LoginRegisterNavigation/button", () => {
  return function MockButton({ label, isValid }: any) {
    return <button disabled={!isValid}>{label}</button>;
  };
});

/* =========================================================
   TESTS
========================================================= */
describe("Login Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Given empty form When page renders Then login button is disabled", () => {
    // Given
    render(<Login_page />);

    // When
    const button = screen.getByText("Login");

    // Then
    expect(button).toBeDisabled();
  });

  test("Given valid form When user fills inputs Then login button becomes enabled", () => {
    // Given
    render(<Login_page />);

    const emailInput = screen.getByTestId("Email");
    const passwordInput = screen.getByTestId("Password");

    // When
    fireEvent.change(emailInput, { target: { value: "test@mail.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    // Then
    expect(screen.getByText("Login")).not.toBeDisabled();
  });

  test("Given valid form When user submits Then handleLoginSubmit is called", () => {
    // Given
    render(<Login_page />);

    const emailInput = screen.getByTestId("Email");
    const passwordInput = screen.getByTestId("Password");

    fireEvent.change(emailInput, { target: { value: "test@mail.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    // When
    fireEvent.submit(emailInput.closest("form")!);

    // Then
    expect(mockLoginSubmit).toHaveBeenCalled();
  });

  test("Given invalid password When user types short password Then button stays disabled", () => {
    // Given
    render(<Login_page />);

    const emailInput = screen.getByTestId("Email");
    const passwordInput = screen.getByTestId("Password");

    // When
    fireEvent.change(emailInput, { target: { value: "test@mail.com" } });
    fireEvent.change(passwordInput, { target: { value: "123" } });

    // Then
    expect(screen.getByText("Login")).toBeDisabled();
  });
});
