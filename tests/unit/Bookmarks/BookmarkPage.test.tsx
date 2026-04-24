import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Bookmarks_page from "@/app/(Pages)/Bookmarks/page";


// MOCK: router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// MOCK: DraggableBookmark
jest.mock("@/public/component/DragAndDrop/dragableBookmark", () => {
  return function MockDraggableBookmark({ bookmark }: any) {
    return <div>{bookmark.title}</div>;
  };
});


const mockGet = jest.fn();
const mockAdd = jest.fn();
const mockDelete = jest.fn();

// MOCK: useBookmark
jest.mock("@/hooks/useBookmark", () => ({
  useBookmark: () => ({
    handleGetBookmarks: mockGet,
    handleAddBookmark: mockAdd,
    handleDeleteBookmark: mockDelete,
  }),
}));

// MOCK: getBookmarks
beforeEach(() => {
  mockGet.mockResolvedValue([
    {
      id: 1,
      title: "Google",
      link: "https://google.com",
      description: "Search engine",
    },
    {
      id: 2,
      title: "YouTube",
      link: "https://youtube.com",
      description: "Video platform",
    },
  ]);
});

/* =========================================================
   TEST SUITE
========================================================= */
describe("Bookmarks Page", () => {
  test("renders bookmarks", async () => {
    render(<Bookmarks_page />);

    await waitFor(() => {
      expect(screen.getByText("Google")).toBeInTheDocument();
      expect(screen.getByText("YouTube")).toBeInTheDocument();
    });
  });

  test("filters bookmarks by search input", async () => {
    render(<Bookmarks_page />);

    await waitFor(() => {
      expect(screen.getByText("Google")).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText(/search/i);

    fireEvent.change(input, { target: { value: "Google" } });

    expect(screen.getByText("Google")).toBeInTheDocument();
    expect(screen.queryByText("YouTube")).not.toBeInTheDocument();
  });

  test("loads bookmarks from API", async () => {
    render(<Bookmarks_page />);

    await waitFor(() => {
      expect(mockGet).toHaveBeenCalled();
      expect(screen.getByText("Google")).toBeInTheDocument();
    });
  });

  test("handles multiple filters correctly", async () => {
    render(<Bookmarks_page />);

    await waitFor(() => {
      expect(screen.getByText("Google")).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText(/search/i);

    fireEvent.change(input, { target: { value: "Video" } });

    expect(screen.getByText("YouTube")).toBeInTheDocument();
    expect(screen.queryByText("Google")).not.toBeInTheDocument();
  });

  test("clears search works if button exists", async () => {
    render(<Bookmarks_page />);

    await waitFor(() => {
      expect(screen.getByText("Google")).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText(/search/i);

    fireEvent.change(input, { target: { value: "test" } });

    const clearBtn = screen.queryByText("✕");

    if (clearBtn) {
      fireEvent.click(clearBtn);
      expect(input).toHaveValue("");
    }
  });
});