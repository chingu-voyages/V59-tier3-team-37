// app/role/page.tsx
import { selectRole } from "./actions";

export default function RolePage() {
  return (
    <div className="flex flex-col gap-4 p-10">
      <h1>Select your Role</h1>
      <form>
        {/* Pass the role to the server action */}
        <button
          formAction={async () => {
            "use server";
            await selectRole("student");
          }}
          className="bg-red-300 p-2 rounded m-4"
          type='button'

        >
          I am a Student
        </button>
        <br />
        <button
          formAction={async () => {
            "use server";
            await selectRole("teacher");
          }}
          className="bg-red-300 p-2 rounded m-4"
          type='button'
        >
          I am a Teacher
        </button>
      </form>
    </div>
  );
}
