import CreatePostPopup from "../../../components/CreatePostPopup";

export default function CareerManagementActions({ canManageCareers }) {
  if (!canManageCareers) {
    return null;
  }

  return (
    <div className="container flex justify-end mx-auto mt-5 mb-10">
      <CreatePostPopup />
    </div>
  );
}
