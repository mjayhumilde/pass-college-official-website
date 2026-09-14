import { ROLES } from "../../../app/auth/accessPolicy";

export const AVAILABLE_COURSES = [
  "BSCS",
  "BSA",
  "BSBA",
  "BSHM",
  "BSTM",
  "BSCRIM",
  "BEED",
];

export const AVAILABLE_ROLES = [
  ROLES.STUDENT,
  ROLES.TEACHER,
  ROLES.ADMIN,
  ROLES.REGISTRAR,
];

export const ACCOUNTS_PER_PAGE = 5;

export const createEmptyAccount = () => ({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: "",
  role: ROLES.STUDENT,
  course: "BSCS",
  studentNumber: "",
});
