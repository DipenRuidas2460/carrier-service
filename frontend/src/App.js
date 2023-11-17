import "./assets/css/styles.css";
import "./assets/css/style.scss";
import Master from "./components/layout/Master";
import { Routes, Route } from "react-router-dom";
import NotFound from "./components/partials/404";
import ForgotPass from "./components/modules/ForgotPass";
import SentMailMessage from "./components/modules/SentMailMessage";
import Register from "./components/modules/auth/Register";
import PasswordReset from "./components/modules/PasswordReset";
import ChatPage from "./pages/ChatPage";
import SuccessfulPasswordChangeMsg from "./components/modules/SuccessfulPasswordChangeMsg";
import HomePage from "./pages/HomePage";
import CustomerPage from "./components/layout/CustomerPage";
import CarrierPage from "./components/layout/CarrierPage";
import Success from "./components/miscellaneous/Success";
import Cancel from "./components/miscellaneous/Cancel";

function App() {
  const token = localStorage.getItem("token");
  const userInfo = localStorage.getItem("userInfo");

  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/404" element={<NotFound />} />
          <Route exact path="/forgotpass" element={<ForgotPass />} />

          <Route
            exact
            path={`/resetpass/${token}`}
            element={<PasswordReset />}
          />

          <Route exact path="/mailsent" element={<SentMailMessage />} />
          <Route
            exact
            path="/success-pass-change"
            element={<SuccessfulPasswordChangeMsg />}
          />
          {token !== undefined && userInfo !== undefined && (
            <>
              <Route
                exact
                path="/master"
                element={<Master token={token} userInfo={userInfo} />}
              />
              <Route
                exact
                path="/customer"
                element={<CustomerPage token={token} userInfo={userInfo} />}
              />
              <Route
                exact
                path="/carrier"
                element={<CarrierPage token={token} userInfo={userInfo} />}
              />
              <Route
                exact
                path="/new-chats"
                element={<ChatPage token={token} userInfo={userInfo} />}
              />

              <Route
                exact
                path="/success"
                element={<Success token={token} />}
              />

              <Route
                exact
                path="/cancel"
                element={<Cancel token={token} />}
              />
            </>
          )}

          <Route exact path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
