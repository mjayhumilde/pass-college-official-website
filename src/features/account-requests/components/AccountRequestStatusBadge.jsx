import { getStatusBadgeClass } from "../utils/accountRequestFormatters";
import RequestStatusIcon from "./RequestStatusIcon";

export default function AccountRequestStatusBadge({ status }) {
  return (
    <div className="flex items-center gap-2">
      <RequestStatusIcon status={status} />
      <span className={getStatusBadgeClass(status)}>{status}</span>
    </div>
  );
}
