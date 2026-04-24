import { render, screen, waitFor } from "@testing-library/react";
import Home from "@/app/(Pages)/page";

// MOCK hooks correctement
jest.mock("@/hooks/useProfile", () => ({
  useProfile: () => ({
    user: {
      firstname: "John",
      email: "john@test.com",
    },
  }),
}));

jest.mock("@/hooks/useBookmark", () => ({
  useBookmark: () => ({
    handleGetNbrBookmarks: jest.fn().mockResolvedValue(5),
  }),
}));

describe("Home Page", () => {
  test("renders dashboard", async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });
  });

  test("renders user firstname", async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/Welcome, John/i)).toBeInTheDocument();
    });
  });

  test("renders email", async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("john@test.com")).toBeInTheDocument();
    });
  });

  test("renders bookmarks number", async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });
});