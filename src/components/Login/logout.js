// logout.js
function logoutButton() {
  return (
    <div id="app">
      <form id="logoutForm">
        <script src="logout.js"></script>
        <button
          type="submit"
          onClick={() => {
            localStorage.removeItem("authToken");
            sessionStorage.removeItem("authToken");
            window.location.href = "/";
          }}
        >
          Log out
        </button>
      </form>
    </div>
  );
}

function loginButton() {
  return (
    <div id="app">
      <form id="logoutForm">
        <button
          type="submit"
          onClick={() => {
            localStorage.removeItem("authToken");
            sessionStorage.removeItem("authToken");
            window.location.href = "/";
          }}
        >
          Log in
        </button>
      </form>
    </div>
  );
}

export { logoutButton, loginButton };
