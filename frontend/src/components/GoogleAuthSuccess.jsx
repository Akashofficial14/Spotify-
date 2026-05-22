import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const GoogleAuthSuccess = () => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.token;

    if (token) {
      try {
        // Decode JWT to get userRole
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join(""),
        );

        const decodedToken = JSON.parse(jsonPayload);
        const userRole = decodedToken.userRole;

        // Save token and role
        localStorage.setItem("token", token);
        localStorage.setItem("logindata", JSON.stringify(decodedToken)); // Save full user data if needed

        // Notify app that auth state changed
        window.dispatchEvent(new Event("storageAuthChanged"));
        console.log("main chal rhaa hu ");
        navigate("/home");
        console.log("main chal rhaa hu home ke baad");
      } catch (error) {
        console.error("Error during Google Auth redirection:", error);
        navigate("");
      }
    } else {
      navigate("");
    }
  }, [params, navigate]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-500 border-t-transparent mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Finalizing secure login...</p>
      </div>
    </div>
  );
};

export default GoogleAuthSuccess;
