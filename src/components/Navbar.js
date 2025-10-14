// Navbar component (updated)
function AppNavbar({ username, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4">
      <Container className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <span className="navbar-brand fw-bold fs-4">Task Dashboard</span>
          {username && (
            <span className="badge bg-light text-primary ms-3 fs-6">
              👋 {username}
            </span>
          )}
        </div>
        <button
          className="btn btn-outline-light px-3 py-1 rounded-pill"
          onClick={onLogout}
        >
          Logout
        </button>
      </Container>
    </nav>
  );
}
