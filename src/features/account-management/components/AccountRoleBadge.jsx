import { ROLES } from "../../../app/auth/accessPolicy";

const getRoleClasses = (role) => {
  switch (role) {
    case ROLES.ADMIN:
      return "bg-purple-100 text-purple-800";
    case ROLES.TEACHER:
      return "bg-blue-100 text-blue-800";
    case ROLES.REGISTRAR:
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-red-800";
  }
};

export default function AccountRoleBadge({ role }) {
  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${getRoleClasses(
        role,
      )}`}
    >
      {role}
    </span>
  );
}
