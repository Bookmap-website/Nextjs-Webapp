import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "@/public/component/navbar/Navbar";

/* =========================================================
   MOCK: next/router
========================================================= */
const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

/* =========================================================
   MOCK: useProfile
========================================================= */
const mockUseProfile = jest.fn();

jest.mock("@/hooks/useProfile", () => ({
  useProfile: () => mockUseProfile(),
}));

/* =========================================================
   MOCK: NavbarButton
========================================================= */
jest.mock("../../../public/component/navbar/navbar-button", () => {
  return function MockButton({ label, onClick }: any) {
    return <button onClick={onClick}>{label}</button>;
  };
});

/* =========================================================
   TESTS
========================================================= */
describe("Navbar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Given admin user When Navbar renders Then Logs button is shown", () => {
    // Given
    mockUseProfile.mockReturnValue({
      isAdmin: true,
    });

    // When
    render(<Navbar />);

    // Then
    expect(screen.getByText("Logs")).toBeInTheDocument();
  });

  test("Given non-admin user When Navbar renders Then Logs button is not shown", () => {
    // Given
    mockUseProfile.mockReturnValue({
      isAdmin: false,
    });

    // When
    render(<Navbar />);

    // Then
    expect(screen.queryByText("Logs")).not.toBeInTheDocument();
  });

  test("Given user When clicking Dashboard Then navigates to home", () => {
    // Given
    mockUseProfile.mockReturnValue({
      isAdmin: false,
    });

    render(<Navbar />);

    // When
    fireEvent.click(screen.getByText("Dashboard"));

    // Then
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  test("Given user When clicking Bookmarks Then navigates to bookmarks page", () => {
    // Given
    mockUseProfile.mockReturnValue({
      isAdmin: false,
    });

    render(<Navbar />);

    // When
    fireEvent.click(screen.getByText("Bookmarks"));

    // Then
    expect(mockPush).toHaveBeenCalledWith("/Bookmarks");
  });

  test("Given user When clicking Logout Then token is removed and user is redirected", () => {
    // Given
    mockUseProfile.mockReturnValue({
      isAdmin: false,
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, "removeItem");

    render(<Navbar />);

    // When
    fireEvent.click(screen.getByText("Logout"));

    // Then
    expect(removeItemSpy).toHaveBeenCalledWith("token");
    expect(mockPush).toHaveBeenCalledWith("/Login");
  });
});