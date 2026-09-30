import React from 'react';
import LandingPage from './pages/LandingPage';
import ConfirmedPage from './pages/ConfirmedPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import DataDeletionPage from './pages/DataDeletionPage';

/**
 * Rotas:
 *   /                 landing (orgânico)
 *   /constru10x       MESMA landing, usada nas campanhas de tráfego pago
 *   /compraconfirmada pós-compra
 *   /politica-de-privacidade e /exclusao-de-dados  páginas legais (linkadas no rodapé)
 * Qualquer outro caminho cai na landing (comportamento anterior do site).
 * O Vercel reescreve todas as rotas para o index.html (ver vercel.json).
 */
export default function App() {
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';

  if (path === '/compraconfirmada') return <ConfirmedPage />;
  if (path === '/politica-de-privacidade') return <PrivacyPolicyPage />;
  if (path === '/exclusao-de-dados') return <DataDeletionPage />;
  return <LandingPage trafficSource={path === '/constru10x' ? 'paid' : 'organic'} />;
}
