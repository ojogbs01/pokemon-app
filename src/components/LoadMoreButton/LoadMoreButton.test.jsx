import LoadMoreButton from "./LoadMoreButton";
import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("LoadMoreButton", () => {
	it("renders with correct text", () => {
		render(<LoadMoreButton onClick={() => {}} />);
		expect(screen.getByRole("button", { name: /load more/i })).toBeInTheDocument();
	});

	it("calls onClick when clicked", () => {
		const handleClick = vi.fn();
		render(<LoadMoreButton onClick={handleClick} />);
		fireEvent.click(screen.getByRole("button", { name: "Load More" }));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
