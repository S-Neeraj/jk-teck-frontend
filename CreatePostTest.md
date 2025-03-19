# Documentation for CreatePost Component Tests

## Overview

This document provides a detailed explanation of the test cases for the `CreatePost` component using Jest and React Testing Library. The tests verify the functionality of the form, input fields, submission behavior, and API interactions.

---

## Test Cases

### 1. Renders the form correctly

**Test Description:**

- Ensures that the `CreatePost` component renders correctly.
- Checks for the presence of form elements such as the title input, content textarea, and publish button.
- Verifies that the publish button is enabled initially.

**Assertions:**

- The button with the text `Publish` should be enabled.
- The title input field should be present with the placeholder `Enter title`.
- The content textarea should be present with the placeholder `Write your content here...`.

---

### 2. Updates the title and content fields

**Test Description:**

- Simulates user input in the title and content fields.
- Ensures that the fields update with the entered text.

**Actions:**

- Type `My Test Post` in the title input field.
- Type `This is the post content.` in the content textarea.

**Assertions:**

- The title input should have a value of `My Test Post`.
- The content textarea should have a value of `This is the post content.`.

---

### 3. Shows loading state when submitting

**Test Description:**

- Simulates form submission.
- Ensures that the publish button is disabled during submission.
- Checks that the button is re-enabled after the submission process is complete.

**Actions:**

- Submit the form using `fireEvent.submit`.

**Assertions:**

- The publish button should be disabled during submission.
- The publish button should be re-enabled after submission completes.

---

### 4. Displays error message on API failure

**Test Description:**

- Mocks a failed API response when submitting the form.
- Ensures that an error message is displayed on the UI.

**Mocked API Response:**

```json
{
  "ok": false,
  "message": "Failed to create post"
}
```

**Assertions:**

- The error message `Failed to create post` should be displayed.

**Cleanup:**

- Restore the global fetch function.

---

### 5. Displays success message on successful post creation

**Test Description:**

- Mocks a successful API response when submitting the form.
- Ensures that a success message is displayed on the UI.

**Mocked API Response:**

```json
{
  "ok": true,
  "message": "Post created successfully!"
}
```

**Assertions:**

- The success message `Post created successfully!` should be displayed.

**Cleanup:**

- Restore the global fetch function.
