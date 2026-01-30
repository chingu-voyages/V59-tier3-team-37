"use client";

import { RoleSelect } from "@/components/custom/role-selection/RoleSelector";

const Roles = () => {
  return (
    <div className="">
      <RoleSelect
        label="Choose your role"
        placeholder="Pick a role"
        onValueChange={(value) => {
          console.log("Selected role:", value);
        }}
      />
    </div>
  );
};
export default Roles;
