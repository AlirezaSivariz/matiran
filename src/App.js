import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, CircularProgress } from "@mui/material";

// Lazy-loaded components
const Dashboard = lazy(() => import("./components/Dashboard"));
const About = lazy(() => import("./components/About"));

export default function App() {
  return (
    <Router>
      <Container>
        <nav style={{ marginBottom: "1rem" }}>
          <Link to="/">Dashboard</Link> | <Link to="/about">About</Link>
        </nav>

        <Suspense
          fallback={
            <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />
          }
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </Container>
    </Router>
  );
}
