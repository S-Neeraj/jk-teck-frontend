import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreatePost from "./CreatePost";

describe("CreatePost Component", () => {
  test("renders the form correctly", () => {
    render(<CreatePost />);

    const button = screen.getByRole("button", { name: "Publish" });

    // Ensure button starts as enabled
    expect(button).not.toBeDisabled();

    expect(screen.getByText("Create a New Post")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter title")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Write your content here...")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Publish" })).toBeInTheDocument();
  });

  test("updates the title and content fields", async () => {
    render(<CreatePost />);

    const titleInput = screen.getByPlaceholderText("Enter title");
    const contentTextarea = screen.getByPlaceholderText(
      "Write your content here..."
    );

    await userEvent.type(titleInput, "My Test Post");
    await userEvent.type(contentTextarea, "This is the post content.");

    expect(titleInput).toHaveValue("My Test Post");
    expect(contentTextarea).toHaveValue("This is the post content.");
  });

  test("shows loading state when submitting", async () => {
    render(<CreatePost />);

    const button = screen.getByRole("button", { name: "Publish" });

    // Ensure button starts as enabled
    expect(button).not.toBeDisabled();

    fireEvent.submit(screen.getByTestId("post-form"));

    // Wait for the button to be disabled
    await waitFor(() => expect(button).toBeDisabled(), { timeout: 1000 });

    // Wait for the button to be re-enabled (after submission completes)
    await waitFor(() => expect(button).not.toBeDisabled(), { timeout: 3000 });
  });

  test("displays error message on API failure", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({ message: "Failed to create post" }),
    });

    render(<CreatePost />);
    fireEvent.submit(screen.getByTestId("post-form"));

    expect(
      await screen.findByText("Failed to create post")
    ).toBeInTheDocument();

    global.fetch.mockRestore(); // Cleanup
  });

  test("displays success message on successful post creation", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: jest
        .fn()
        .mockResolvedValue({ message: "Post created successfully!" }),
    });

    render(<CreatePost />);
    fireEvent.submit(screen.getByTestId("post-form"));

    expect(
      await screen.findByText("Post created successfully!")
    ).toBeInTheDocument();

    global.fetch.mockRestore(); // Cleanup
  });
});
