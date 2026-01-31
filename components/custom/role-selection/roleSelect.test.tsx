import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, test,vi } from "vitest";
import { RoleSelect } from "./RoleSelector";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
  }),
}))

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
    expect(screen.findByText("Administrator")).toBeDefined();
    expect(screen.findByText("Editor")).toBeDefined();
    expect(screen.findByText("Viewer")).toBeDefined();
  });
});
