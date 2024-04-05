export function handleUnauthorized(setIsLoggedIn, setToastMessage, router) {
  router.push("/");
  localStorage.removeItem("token");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("role");
  setIsLoggedIn(false);
  setToastMessage("Session expired. Please login again");
}
