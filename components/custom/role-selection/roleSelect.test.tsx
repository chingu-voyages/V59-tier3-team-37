import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, test } from "vitest";
import { RoleSelect } from "./RoleSelector";

const options = [
  { value: "admin", label: "Administrator" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
];

describe("RoleSelect Component", () => {
  beforeAll(async () => {
    await render(<RoleSelect options={options} placeholder="Select role" />);
  });
  test("RoleSelect renders with placeholder", async () => {
    expect(screen.getByText("Select role")).toBeDefined();
  });

  test("RoleSelect reenders options", async () => {
    const ComboBox = screen.getByRole("combobox");
    await ComboBox.click();
    expect(screen.getByText("Administrator")).toBeDefined();
    expect(screen.getByText("Editor")).toBeDefined();
    expect(screen.getByText("Viewer")).toBeDefined();
  });
});
