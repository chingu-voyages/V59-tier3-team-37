import { RoleSelect } from "@/components/custom/role-selection/RoleSelector";

function UIPage() {
  return (
    <div className="p-4">
      <RoleSelect
        placeholder="Select level"
        options={[
          {
            value: "junior",
            label: "Junior Developer",
          },
          {
            value: "mid",
            label: "Mid-level Developer",
          },
          {
            value: "senior",
            label: "Senior Developer",
          },
          {
            value: "lead",
            label: "Lead Developer",
          },
        ]}
      />
    </div>
  );
}
export default UIPage;
