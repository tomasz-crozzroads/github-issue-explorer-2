import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookmarkButton from "./BookmarkButton";

describe("<BookmarkButton />", () => {
  it("should render <StarOutlined /> if not checked", () => {
    const { container } = render(<BookmarkButton checked={false} />);

    expect(container.querySelector(".checked")).toBeNull();
    expect(container.querySelector(".unchecked")).toBeInTheDocument();
  });

  it("should render <StarFilled /> if checked", () => {
    const { container } = render(<BookmarkButton checked={true} />);

    expect(container.querySelector(".checked")).toBeInTheDocument();
    expect(container.querySelector(".unchecked")).toBeNull();
  });

  it("should call onToggle on click", () => {
    const handleToggle = jest.fn();

    render(<BookmarkButton checked={true} onToggle={handleToggle} />);

    userEvent.click(screen.getByRole("button"));

    expect(handleToggle).toBeCalledTimes(1);
  });
});
