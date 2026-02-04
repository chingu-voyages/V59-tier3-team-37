"use client";

import { RoleSelect } from "@/components/custom/role-selection/RoleSelector";

// import { Typeahead } from "@/components/custom/typeahead/Typeahead"; // optional to use

const Roles = () => {
  return (
    <div>
      <RoleSelect label="Choose your role" placeholder="Pick a role" />
      {/* <Typeahead /> */
      /* optional to use */}
    </div>
  );
};
export default Roles;
