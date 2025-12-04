// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

// Public pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/services/ServicesPage";
import CareersPage from "./pages/careers/CareersPage";
import ContactPage from "./pages/ContactPage";

// Admin pages
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminApplicationsPage from "./pages/admin/AdminApplicationsPage";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminAboutPage from "./pages/admin/AdminAboutPage";
import AdminCareersPage from "./pages/admin/AdminCareersPage";
import AdminContactPage from "./pages/admin/AdminContactPage";
import AdminHeroPage from "./pages/admin/AdminHeroPage";
import AdminReviewPage from "./pages/admin/AdminReviewPage";
import AdminServicesPage from "./pages/admin/AdminServicesPage";
import type { JSX } from "react";

function App() {
  // helper so we don’t repeat <Layout>
  const withLayout = (
    page: JSX.Element,
    options?: { noContainer?: boolean }
  ) => <Layout noContainer={options?.noContainer}>{page}</Layout>;

  return (
    <Routes>
      {/* Public site (all wrapped in main Layout) */}
      <Route path="/" element={withLayout(<HomePage />)} />
      <Route path="/about" element={withLayout(<AboutPage />)} />
      <Route path="/services" element={withLayout(<ServicesPage />)} />

      {/* Careers -> full-width page via noContainer */}
      <Route
        path="/careers"
        element={withLayout(<CareersPage />, { noContainer: true })}
      />

      <Route path="/contact" element={withLayout(<ContactPage />)} />

      {/* Admin auth – uses public Layout so it feels like a normal page */}
      <Route path="/admin/login" element={withLayout(<AdminLoginPage />)} />

      {/* Admin shell – full-width panel with its own layout + sidebar */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminHeroPage />} />
        <Route path="hero" element={<AdminHeroPage />} />
        <Route path="about" element={<AdminAboutPage />} />
        <Route path="services" element={<AdminServicesPage />} />
        <Route path="careers" element={<AdminCareersPage />} />
        <Route path="contact" element={<AdminContactPage />} />
        <Route path="review" element={<AdminReviewPage />} />
        <Route path="applications" element={<AdminApplicationsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;