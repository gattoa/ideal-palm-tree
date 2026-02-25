import { render, screen, fireEvent } from "@testing-library/react";
import Home from "@/app/page";

describe("To Do List", () => {
  it("renders the heading", () => {
    render(<Home />);
    expect(screen.getByText("To Do List")).toBeInTheDocument();
  });

  it("renders the empty state", () => {
    render(<Home />);
    expect(screen.getByText("Add your first task above")).toBeInTheDocument();
  });

  it("adds a new todo", () => {
    render(<Home />);
    const input = screen.getByPlaceholderText("What needs to be done?");
    const button = screen.getByRole("button", { name: "Add" });

    fireEvent.change(input, { target: { value: "Buy groceries" } });
    fireEvent.click(button);

    expect(screen.getByText("Buy groceries")).toBeInTheDocument();
  });

  it("does not add empty todo", () => {
    render(<Home />);
    const button = screen.getByRole("button", { name: "Add" });

    fireEvent.click(button);

    expect(screen.getByText("Add your first task above")).toBeInTheDocument();
  });

  it("toggles a todo completed", () => {
    render(<Home />);
    const input = screen.getByPlaceholderText("What needs to be done?");
    const addBtn = screen.getByRole("button", { name: "Add" });

    fireEvent.change(input, { target: { value: "Read a book" } });
    fireEvent.click(addBtn);

    const toggleBtn = screen.getByRole("button", { name: "Mark as complete" });
    fireEvent.click(toggleBtn);

    expect(screen.getByText("Read a book")).toHaveClass("line-through");
  });

  it("deletes a todo", () => {
    render(<Home />);
    const input = screen.getByPlaceholderText("What needs to be done?");
    const addBtn = screen.getByRole("button", { name: "Add" });

    fireEvent.change(input, { target: { value: "Walk the dog" } });
    fireEvent.click(addBtn);

    expect(screen.getByText("Walk the dog")).toBeInTheDocument();

    const deleteBtn = screen.getByRole("button", { name: "Delete todo" });
    fireEvent.click(deleteBtn);

    expect(screen.queryByText("Walk the dog")).not.toBeInTheDocument();
  });

  it("filters todos", () => {
    render(<Home />);
    const input = screen.getByPlaceholderText("What needs to be done?");
    const addBtn = screen.getByRole("button", { name: "Add" });

    fireEvent.change(input, { target: { value: "Task A" } });
    fireEvent.click(addBtn);
    fireEvent.change(input, { target: { value: "Task B" } });
    fireEvent.click(addBtn);

    const toggleBtn = screen.getAllByRole("button", { name: "Mark as complete" })[0];
    fireEvent.click(toggleBtn);

    const activeFilter = screen.getByRole("button", { name: "Active" });
    fireEvent.click(activeFilter);

    expect(screen.getByText("Task A")).toBeInTheDocument();
    expect(screen.queryByText("Task B")).not.toBeInTheDocument();
  });
});
