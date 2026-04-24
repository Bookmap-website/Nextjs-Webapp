import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LogItem from "@/public/component/Logs/renderItemLogs";

test("renders log action", () => {
  render(<LogItem log={{ action_made: "Deleted bookmark" }} />);

  expect(screen.getByText("Deleted bookmark")).toBeInTheDocument();
});
