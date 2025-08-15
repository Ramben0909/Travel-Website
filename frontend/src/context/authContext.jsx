import { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isAuthenticated, user, getAccessTokenSilently, loginWithRedirect } = useAuth0();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isAuthenticated) return;

      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://YOUR_DOMAIN/api/v2/",
            scope: "openid profile email"
          }
        });

        // If you want extra profile data from your API
        const res = await fetch("https://example.com/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        } else {
          setProfile(user); // fallback to Auth0 profile
        }
      } catch (err) {
        if (err.error === "consent_required" || err.message?.includes("Consent required")) {
          await loginWithRedirect({
            authorizationParams: {
              audience: "https://YOUR_DOMAIN/api/v2/",
              scope: "openid profile email",
              prompt: "consent"
            }
          });
        } else {
          console.error("Error fetching profile:", err);
        }
      }
    };

    fetchProfile();
  }, [isAuthenticated, getAccessTokenSilently, loginWithRedirect, user]);

  return (
    <AuthContext.Provider value={{ profile, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
