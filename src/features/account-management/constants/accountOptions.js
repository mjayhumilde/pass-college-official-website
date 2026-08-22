export const AVAILABLE_COURSES = [
  "BSCS",
  "BSA",
  "BSBA",
  "BSHM",
  "BSTM",
  "BSCRIM",
  "BEED",
];

export const AVAILABLE_ROLES = ["student", "teacher", "admin", "registrar"];

export const ACCOUNTS_PER_PAGE = 5;

export const createEmptyAccount = () => ({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: "",
  role: "student",
  course: "BSCS",
  studentNumber: "",
});
