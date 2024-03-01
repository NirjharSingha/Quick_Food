export function handleUnauthorized(setIsLoggedIn, setToastMessage, router) {
  router.push("/");
  localStorage.removeItem("token");
  localStorage.removeItem("isLoggedIn");
  setIsLoggedIn(false);
  setToastMessage("Session expired. Please login again");
}
