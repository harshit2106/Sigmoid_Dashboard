import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/LoginScreen/Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Dashboard from "./Components/DashboardUI/Dashboard";
import DateRange from "./Components/DateRangePicker/DateRange";
import Analytics from "./Components/AnalyticsScreen.js/Analytics";

function App() {
  return (
    <Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="date-range-picker" element={<DateRange />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

        <Route
          path="/"
          element={<Navigate replace to="/dashboard/date-range-picker" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
