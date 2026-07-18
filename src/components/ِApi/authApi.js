import { api, setAuthToken, clearAuthToken } from ".";

// ✅ FORCE COOKIES ON ALL REQUESTS
api.defaults.withCredentials = true;

// Login
export const login = async (data) => {
  try {
    const res = await api.post("/authentication/auth-login", data, {
      withCredentials: true,
    });
    if (res.data?.token) {
      setAuthToken(res.data.token);
    }
    return res.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

// getMe - Session Check
export const getMe = async () => {
  try {
    const res = await api.get("/users/me", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    if (error.response?.status === 401) {
      console.log("No session");
    }
    throw error;
  }
};

// Logout - Clear Session
export const logout = async () => {
  try {
    await api.post(
      "/authentication/logout",
      {},
      {
        withCredentials: true,
      },
    );
    clearAuthToken();
    console.log("Session cleared");
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export const signup = async (data) => {
  try {
    const res = await api.post("/authentication/auth-signup", data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// // ================= LOGIN =================
// export const login = async (data) => {
//   console.log(data);

//   const res = await api.post("/authentication/auth-login", data, {
//     withCredentials: true,
//   });
//   console.log(res);

//   return res.data;
// };

// // ================= LOGOUT =================
// export const logout = async () => {
//   const res = await api.post(
//     "/authentication/logout",
//     {},
//     {
//       withCredentials: true,
//     },
//   );
//   return res.data;
// };

// // ================= GET ME =================
// export const getMe = async () => {
//   const res = await api.get("/users/me", {
//     withCredentials: true,
//   });
//   return res.data;
// };

export const verifyEmailCode = async (email, code) => {
  try {
    const data = {
      email,
      code,
    };
    const res = await api.post("/authentication/auth-verify-email-code", data);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const reSendEmailCode = async (email) => {
  try {
    const res = await api.post("/authentication/auth-send-email-code", {
      email,
    });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const changePassword = async (data) => {
  const res = await api.patch("/authentication/auth-update-password", data);
  return res.data;
};

export const forgotPassword = async (email) => {
  const res = await api.post(`/authentication/forgot-password`, {
    email,
  });

  return res.data;
};

// 🔐 RESET PASSWORD (with token from email URL)
export const resetPassword = async (token, password, passwordConfirm) => {
  console.log(token);

  const res = await api.patch(`/authentication/reset-password/${token}`, {
    password,
    passwordConfirm,
  });

  return res.data;
};
