"use client";

import { RoleSelect } from "@/components/custom/role-selection/RoleSelector";
import { Typeahead } from "@/components/custom/typeahead/Typeahead";

const Roles = () => {
  return (
    <div>
      <RoleSelect label="Choose your role" placeholder="Pick a role" />
      <Typeahead />
    </div>
  );
};
export default Roles;
