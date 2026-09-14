import { ROLES } from "../../../app/auth/accessPolicy";

export const ACCOUNT_REQUEST_ROLES = [
  { value: ROLES.STUDENT, label: "Student" },
  { value: ROLES.TEACHER, label: "Teacher" },
  { value: ROLES.REGISTRAR, label: "Registrar" },
  { value: ROLES.ADMIN, label: "Admin" },
];

export const ACCOUNT_REQUEST_COURSES = [
  { value: "none", label: "Select your course" },
  { value: "BSCS", label: "BSCS" },
  { value: "BSA", label: "BSA" },
  { value: "BSBA", label: "BSBA" },
  { value: "BSHM", label: "BSHM" },
  { value: "BSTM", label: "BSTM" },
  { value: "BSCRIM", label: "BSCRIM" },
  { value: "BEED", label: "BEED" },
];
