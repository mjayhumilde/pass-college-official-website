import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Announce from "./pages/Announce";
import About from "./pages/AboutPages/About";
import Events from "./pages/Events";
import Uniform from "./pages/Uniform";
import ReqDocs from "./pages/ReqDocs";
import Careers from "./pages/Careers";
import Layout from "./components/Layout";
import WhoWeAre from "./pages/AboutPages/WhoWeAre";
import HistoryAndTradition from "./pages/AboutPages/HistoryAndTradition";
import CollegePrograms from "./pages/AboutPages/CollegePrograms";
import Profile from "./pages/Profile";
import Notification from "./pages/Notification";
import Login from "./pages/Login";
import Accounts from "./pages/Accounts";
import Request from "./pages/Request";
import TransactionReport from "./pages/TransactionReport";

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
          <Route path="announcements" element={<Announce />} />
          <Route path="news-events" element={<Events />} />
          <Route path="uniforms" element={<Uniform />} />
          <Route path="reqdocs" element={<ReqDocs />} />
          <Route path="careers" element={<Careers />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notifications" element={<Notification />} />
          <Route path="login" element={<Login />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="request" element={<Request />} />
          <Route path="transaction-report" element={<TransactionReport />} />

          {/* <Route path="/profile" element={}/>
        <Route path="/signup" element={}/>
        <Route path="/login" element={}/> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
