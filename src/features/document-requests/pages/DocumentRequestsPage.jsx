import DocumentRequestForm from "../components/DocumentRequestForm";
import MyDocumentRequests from "../components/MyDocumentRequests";

export default function DocumentRequestsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-12">
      <DocumentRequestForm />
      <MyDocumentRequests />
    </main>
  );
}
