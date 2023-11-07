import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import usePasswordToggle from "../../../hook/usePasswordToggle";
import { useToast } from "@chakra-ui/react";

function Login() {
  const [input, setInput] = useState({ email: "", password: "" });
  const [passwordInputType, ToggleIcon] = usePasswordToggle();
  const navigate = useNavigate();
  const toast = useToast();
  const host = `http://localhost:3010`;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${host}/customer/login`, input)
      .then((result) => {
        if (result.data.status === "success") {
          localStorage.setItem("userInfo", JSON.stringify(result.data.userdata));
          localStorage.setItem("token", result.data.token);
          toast({
            title: "User Logged-In Successfully!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          if (result.data.userdata.role === "admin") {
            navigate("/master");
          } else if (result.data.userdata.role === "customer") {
            navigate("/customer");
          } else {
            navigate("/carrier");
          }
        } else {
          navigate("/register");
          toast({
            title: "You don't any account please register first!",
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        toast({
          title: "Invalid Cradentials (either email or password is wrong)!",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  const handleinput = (e) => {
    setInput((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="container-fluid" id={"login"}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="card bg-theme">
                <div className="card-header">
                  <h4>Carrier Service Login</h4>
                </div>
                <div className="card-body">
                  <label className={"w-100"}>
                    <p>Email*</p>
                    <input
                      className={"form-control"}
                      type={"email"}
                      name={"email"}
                      value={input.email}
                      onChange={(e) => handleinput(e)}
                      required
                    />
                  </label>
                  <label className={"w-100 mt-4"}>
                    <p>Password*</p>
                  </label>

                  <div className="input-group mb-3">
                    <input
                      className={"form-control"}
                      type={passwordInputType}
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={input.password}
                      onChange={(e) => handleinput(e)}
                      minLength={8}
                      maxLength={16}
                      required
                    />
                    <span className="input-group-text">{ToggleIcon}</span>
                  </div>

                  <div className="d-grid mt-3 pb-2">
                    <button className={"btn btn-outline-warning"}>Login</button>
                  </div>
                  <a
                    className="mt-2"
                    href="/forgotpass"
                    style={{ color: "yellow", cursor: "pointer" }}
                  >
                    Forgot Password?
                  </a>
                  <p className="mt-2" style={{ color: "white" }}>
                    Don't have any account please{" "}
                    <a href="/register" style={{ color: "yellow" }}>
                      Register
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
