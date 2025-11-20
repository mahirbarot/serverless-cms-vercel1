import React from 'react';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Custom CMS API</title>
        <meta name="description" content="Custom CMS Backend API" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={styles.main}>
        <div style={styles.container}>
          <h1 style={styles.title}>🚀 Custom CMS API</h1>
          <p style={styles.description}>
            Your CMS backend is running successfully!
          </p>
          
          <div style={styles.card}>
            <h2>📚 API Documentation</h2>
            <p>Check the following endpoints:</p>
            <ul style={styles.list}>
              <li>
                <a href="/api/health" style={styles.link}>
                  /api/health
                </a>
                {' '}- Health check
              </li>
              <li>
                <strong>Public endpoints:</strong> /api/public/*
              </li>
              <li>
                <strong>Admin endpoints:</strong> /api/* (requires authentication)
              </li>
            </ul>
          </div>

          <div style={styles.card}>
            <h2>🔐 Getting Started</h2>
            <ol style={styles.list}>
              <li>Register an admin account: POST /api/auth/register</li>
              <li>Login: POST /api/auth/login</li>
              <li>Use the token to access protected endpoints</li>
            </ol>
          </div>

          <div style={styles.card}>
            <h2>📖 Documentation Files</h2>
            <p>Check these files in your project:</p>
            <ul style={styles.list}>
              <li><code>README.md</code> - Setup guide</li>
              <li><code>API_DOCUMENTATION.md</code> - Complete API docs</li>
            </ul>
          </div>

          <div style={styles.footer}>
            <p>Built with Next.js + MongoDB + Vercel</p>
          </div>
        </div>
      </main>
    </>
  );
}

const styles = {
  main: {
    minHeight: '100vh',
    padding: '2rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  } as React.CSSProperties,
  container: {
    maxWidth: '900px',
    margin: '0 auto',
  } as React.CSSProperties,
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: '1rem',
  } as React.CSSProperties,
  description: {
    fontSize: '1.25rem',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: '3rem',
  } as React.CSSProperties,
  card: {
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    marginBottom: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  } as React.CSSProperties,
  list: {
    lineHeight: '1.8',
    color: '#333',
  } as React.CSSProperties,
  link: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: 'bold',
  } as React.CSSProperties,
  footer: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: '3rem',
    fontSize: '0.9rem',
  } as React.CSSProperties,
};

