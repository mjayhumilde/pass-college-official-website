const matchesSearch = (account, searchTerm) => {
  const normalizedSearch = searchTerm.toLowerCase();
  const fullName = `${account.firstName} ${account.lastName}`.toLowerCase();
  const email = account.email.toLowerCase();
  const studentNumber = account.studentNumber?.toLowerCase() || "";

  return (
    fullName.includes(normalizedSearch) ||
    email.includes(normalizedSearch) ||
    studentNumber.includes(normalizedSearch)
  );
};

export const filterActiveAccounts = ({
  accounts,
  userRole,
  searchTerm,
  courseFilter,
  roleFilter,
}) =>
  accounts
    .filter((account) => userRole !== "registrar" || account.role === "student")
    .filter(
      (account) =>
        matchesSearch(account, searchTerm) &&
        (courseFilter === "" || account.course === courseFilter) &&
        (roleFilter === "" || account.role === roleFilter),
    );

export const filterDeactivatedAccounts = ({
  accounts,
  searchTerm,
  courseFilter,
}) =>
  accounts.filter(
    (account) =>
      matchesSearch(account, searchTerm) &&
      (courseFilter === "" || account.course === courseFilter),
  );
