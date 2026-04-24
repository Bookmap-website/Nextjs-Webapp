import { render, screen, fireEvent } from "@testing-library/react";
import LogsPage from "@/app/(Pages)/Logs/page";
import "@testing-library/jest-dom";

// MOCK HOOK
jest.mock("@/hooks/useLogs", () => ({
  useLogs: () => ({
    handleFetchLogs: jest.fn().mockResolvedValue([
      {
        action_made: "Created bookmark",
        details: "first log",
        created_at: "2024-01-01",
      },
      {
        action_made: "Deleted bookmark",
        details: "second log",
        created_at: "2024-01-02",
      },
    ]),
  }),
}));

describe("LogsPage", () => {
  test("renders logs", async () => {
    render(<LogsPage />);

    expect(await screen.findByText("Created bookmark")).toBeInTheDocument();
    expect(await screen.findByText("Deleted bookmark")).toBeInTheDocument();
  });

  test("filters logs with search input", async () => {
    render(<LogsPage />);

    await screen.findByText("Created bookmark");

    fireEvent.change(screen.getByPlaceholderText(/Rechercher/i), {
      target: { value: "Created" },
    });

    expect(screen.getByText("Created bookmark")).toBeInTheDocument();
    expect(screen.queryByText("Deleted bookmark")).not.toBeInTheDocument();
  });

  test("shows empty state when no logs match", async () => {
    render(<LogsPage />);

    await screen.findByText("Created bookmark");

    fireEvent.change(screen.getByPlaceholderText(/Rechercher/i), {
      target: { value: "zzz-not-found" },
    });

    expect(
      screen.getByText("Aucun log trouvé")
    ).toBeInTheDocument();
  });

  test("clears search input", async () => {
    render(<LogsPage />);

    await screen.findByText("Created bookmark");

    const input = screen.getByPlaceholderText(/Rechercher/i);

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(screen.getByText("✕"));

    expect(input).toHaveValue("");
  });

  test("search is case insensitive", async () => {
    render(<LogsPage />);

    await screen.findByText("Created bookmark");

    fireEvent.change(screen.getByPlaceholderText(/Rechercher/i), {
      target: { value: "created" },
    });

    expect(screen.getByText("Created bookmark")).toBeInTheDocument();
  });

  test("renders log details", async () => {
    render(<LogsPage />);

    expect(await screen.findByText("first log")).toBeInTheDocument();
    expect(await screen.findByText("second log")).toBeInTheDocument();
  });

  test("renders created_at date", async () => {
    render(<LogsPage />);

    expect(await screen.findByText(/2024-01-01/i)).toBeInTheDocument();
  });
});