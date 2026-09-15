import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Announce from "./pages/Announce";
import About from "./pages/AboutPages/About";
import Events from "./pages/Events";
import Uniform from "./pages/Uniform";
import ReqDocs from "./pages/ReqDocs";
import Careers from "./pages/Careers";
import Layout from "./app/layout/Layout";
import WhoWeAre from "./pages/AboutPages/WhoWeAre";
import HistoryAndTradition from "./pages/AboutPages/HistoryAndTradition";
import CollegePrograms from "./pages/AboutPages/CollegePrograms";
import Profile from "./pages/Profile";
import Notification from "./pages/Notification";
import Login from "./pages/Login";
import Accounts from "./pages/Accounts";
import Request from "./pages/Request";
import TransactionReport from "./pages/TransactionReport";
import AccountRequest from "./pages/AccountRequest";
import CreateAccountRequest from "./pages/CreateAccountRequest";
import KnowledgeManagement from "./pages/AiKnowledge";
import ResetPassword from "./pages/ResetPassword";
import ClearanceMeeting from "./pages/ClearanceMeeting";
import Newsletter from "./pages/Newsletter";
import { PERMISSIONS } from "./app/auth/accessPolicy";
import AccessDeniedPage from "./app/routing/AccessDeniedPage";
import GuestRoute from "./app/routing/GuestRoute";
import ProtectedRoute from "./app/routing/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />}>
            <Route path="who-we-are" element={<WhoWeAre />} />
            <Route path="history-tradition" element={<HistoryAndTradition />} />
            <Route path="college-programs" element={<CollegePrograms />} />
          </Route>
          <Route path="news-events" element={<Events />} />
          <Route path="careers" element={<Careers />} />
          <Route path="unauthorized" element={<AccessDeniedPage />} />

          <Route element={<GuestRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="resetPassword/:token" element={<ResetPassword />} />
          </Route>

          <Route
            path="login/create-account-request"
            element={<CreateAccountRequest />}
          />

          <Route
            element={
              <ProtectedRoute permission={PERMISSIONS.VIEW_MEMBER_CONTENT} />
            }
          >
            <Route path="announcements" element={<Announce />} />
            <Route path="uniforms" element={<Uniform />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route
            element={
              <ProtectedRoute permission={PERMISSIONS.VIEW_NOTIFICATIONS} />
            }
          >
            <Route path="notifications" element={<Notification />} />
          </Route>

          <Route
            element={
              <ProtectedRoute permission={PERMISSIONS.REQUEST_DOCUMENTS} />
            }
          >
            <Route path="reqdocs" element={<ReqDocs />} />
          </Route>

          <Route
            element={
              <ProtectedRoute permission={PERMISSIONS.MANAGE_ACCOUNTS} />
            }
          >
            <Route path="accounts" element={<Accounts />} />
          </Route>

          <Route
            element={
              <ProtectedRoute permission={PERMISSIONS.MANAGE_DOCUMENTS} />
            }
          >
            <Route path="request" element={<Request />} />
          </Route>

          <Route
            element={
              <ProtectedRoute
                permission={PERMISSIONS.VIEW_TRANSACTION_REPORTS}
              />
            }
          >
            <Route path="transaction-report" element={<TransactionReport />} />
          </Route>

          <Route
            element={
              <ProtectedRoute
                permission={PERMISSIONS.MANAGE_ACCOUNT_REQUESTS}
              />
            }
          >
            <Route path="account-request" element={<AccountRequest />} />
          </Route>

          <Route
            element={
              <ProtectedRoute permission={PERMISSIONS.MANAGE_AI_KNOWLEDGE} />
            }
          >
            <Route path="ai-knowledge" element={<KnowledgeManagement />} />
          </Route>

          <Route
            element={
              <ProtectedRoute
                permission={PERMISSIONS.MANAGE_CLEARANCE_MEETINGS}
              />
            }
          >
            <Route path="clearance-meeting" element={<ClearanceMeeting />} />
          </Route>

          <Route
            element={
              <ProtectedRoute permission={PERMISSIONS.MANAGE_NEWSLETTER} />
            }
          >
            <Route path="newsletter" element={<Newsletter />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
