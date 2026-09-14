export const ROLES = Object.freeze({
  ADMIN: "admin",
  REGISTRAR: "registrar",
  TEACHER: "teacher",
  STUDENT: "student",
});

export const PERMISSIONS = Object.freeze({
  VIEW_MEMBER_CONTENT: "view-member-content",
  VIEW_NOTIFICATIONS: "view-notifications",
  MANAGE_POSTS: "manage-posts",
  REQUEST_DOCUMENTS: "request-documents",
  MANAGE_DOCUMENTS: "manage-documents",
  MANAGE_ACCOUNTS: "manage-accounts",
  MANAGE_ALL_ACCOUNTS: "manage-all-accounts",
  VIEW_TRANSACTION_REPORTS: "view-transaction-reports",
  MANAGE_ACCOUNT_REQUESTS: "manage-account-requests",
  MANAGE_AI_KNOWLEDGE: "manage-ai-knowledge",
  MANAGE_CLEARANCE_MEETINGS: "manage-clearance-meetings",
  MANAGE_NEWSLETTER: "manage-newsletter",
});

const ALL_ROLES = Object.freeze(Object.values(ROLES));

const PERMISSION_ROLES = Object.freeze({
  [PERMISSIONS.VIEW_MEMBER_CONTENT]: ALL_ROLES,
  [PERMISSIONS.VIEW_NOTIFICATIONS]: Object.freeze([
    ROLES.REGISTRAR,
    ROLES.TEACHER,
    ROLES.STUDENT,
  ]),
  [PERMISSIONS.MANAGE_POSTS]: Object.freeze([ROLES.ADMIN, ROLES.REGISTRAR]),
  [PERMISSIONS.REQUEST_DOCUMENTS]: Object.freeze([ROLES.STUDENT]),
  [PERMISSIONS.MANAGE_DOCUMENTS]: Object.freeze([ROLES.REGISTRAR]),
  [PERMISSIONS.MANAGE_ACCOUNTS]: Object.freeze([ROLES.ADMIN, ROLES.REGISTRAR]),
  [PERMISSIONS.MANAGE_ALL_ACCOUNTS]: Object.freeze([ROLES.ADMIN]),
  [PERMISSIONS.VIEW_TRANSACTION_REPORTS]: Object.freeze([ROLES.ADMIN]),
  [PERMISSIONS.MANAGE_ACCOUNT_REQUESTS]: Object.freeze([
    ROLES.ADMIN,
    ROLES.REGISTRAR,
  ]),
  [PERMISSIONS.MANAGE_AI_KNOWLEDGE]: Object.freeze([
    ROLES.ADMIN,
    ROLES.REGISTRAR,
  ]),
  [PERMISSIONS.MANAGE_CLEARANCE_MEETINGS]: Object.freeze([ROLES.TEACHER]),
  [PERMISSIONS.MANAGE_NEWSLETTER]: Object.freeze([
    ROLES.ADMIN,
    ROLES.REGISTRAR,
  ]),
});

const ROLE_LABELS = Object.freeze({
  [ROLES.ADMIN]: "Administrator",
  [ROLES.REGISTRAR]: "Registrar",
  [ROLES.TEACHER]: "Teacher",
  [ROLES.STUDENT]: "Student",
});

const STAFF_ROLES = Object.freeze([
  ROLES.ADMIN,
  ROLES.REGISTRAR,
  ROLES.TEACHER,
]);

export function hasPermission(role, permission) {
  return PERMISSION_ROLES[permission]?.includes(role) ?? false;
}

export function getRoleLabel(role) {
  return ROLE_LABELS[role] ?? "User";
}

export function isStaffRole(role) {
  return STAFF_ROLES.includes(role);
}
