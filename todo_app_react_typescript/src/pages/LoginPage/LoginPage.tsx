import { useEffect, useState } from "react";
import { postLogin } from "../../store/features/todosSlice/loginSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [user, setUser] = useState({ user_name: "", password: "" });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const stored_token = useAppSelector(
    (state) => state.login.user_login.access_token
  );
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    // console.log("user", user);
    dispatch(postLogin(user));
    // localStorage.setItem("access_token", stored_token);
    navigate("/");
    // console.log("login_datails",login_details);
    // dispatch(storeLogin(login_details));
  };

  //   useEffect(() => {
  //     dispatch(clearAccessToken());
  //   }, []);

  return (
    <div>
      <input
        type="text"
        name="user_name"
        value={user.user_name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="password"
        value={user.password}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}

export default LoginPage;
