import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AGENTFORGE | Professional AI Workforce Marketplace',
  description: 'Deploy autonomous AI operations. Command your AI army with precision.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>AGENTFORGE | Professional AI Workforce Marketplace</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700&family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
        <script dangerouslySetInnerHTML={{__html: `
          tailwind.config = {
            darkMode: "class",
            theme: {
              extend: {
                colors: {
                  "surface-container-high": "#201f1f",
                  "surface-tint": "#00d4ff",
                  "error": "#ff716c",
                  "surface-variant": "#262626",
                  "on-tertiary-container": "#005f28",
                  "surface-container-low": "#131313",
                  "background": "#0a0a0a",
                  "primary-fixed-dim": "#00c3eb",
                  "secondary-fixed": "#dac9ff",
                  "primary-container": "#00d2fd",
                  "on-primary": "#004c5e",
                  "tertiary-fixed": "#6bff8f",
                  "tertiary-dim": "#5bf083",
                  "inverse-primary": "#00687e",
                  "tertiary-container": "#6bff8f",
                  "inverse-surface": "#fcf8f8",
                  "on-background": "#ffffff",
                  "secondary": "#8b5cf6",
                  "primary": "#00d4ff",
                  "on-tertiary": "#00692c",
                  "on-error": "#490006",
                  "on-secondary-container": "#d9c8ff",
                  "surface-container": "#1a1919",
                  "on-surface-variant": "#adaaaa",
                  "secondary-dim": "#8455ef",
                  "on-secondary-fixed": "#40009b",
                  "secondary-fixed-dim": "#ceb9ff",
                  "outline-variant": "#494847",
                  "surface-dim": "#0a0a0a",
                  "surface-container-lowest": "#000000",
                  "error-dim": "#d7383b",
                  "on-error-container": "#ffa8a3",
                  "on-primary-fixed-variant": "#004c5d",
                  "surface": "#0a0a0a",
                  "on-surface": "#ffffff",
                  "error-container": "#9f0519",
                  "on-secondary-fixed-variant": "#5f28c8",
                  "outline": "#777575",
                  "inverse-on-surface": "#565554",
                  "primary-fixed": "#00d2fd",
                  "on-primary-container": "#004352",
                  "primary-dim": "#00c3eb",
                  "surface-container-highest": "#262626",
                  "surface-bright": "#2c2c2c",
                  "on-tertiary-fixed": "#004a1d",
                  "secondary-container": "#5516be",
                  "tertiary-fixed-dim": "#5bf083",
                  "tertiary": "#c5ffc9",
                  "on-secondary": "#280067",
                  "on-tertiary-fixed-variant": "#006a2d",
                  "on-primary-fixed": "#002c37"
                },
                fontFamily: {
                  "headline": ["Orbitron", "Space Grotesk"],
                  "body": ["Rajdhani", "Manrope"],
                  "label": ["Space Grotesk", "Manrope"]
                },
                borderRadius: {"DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem"},
              },
            },
          }
        `}} />
        <style dangerouslySetInnerHTML={{__html: `
          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
            font-size: 1.25rem;
          }
          .grid-pattern {
            background-image: linear-gradient(to right, rgba(0, 212, 255, 0.03) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(0, 212, 255, 0.03) 1px, transparent 1px);
            background-size: 40px 40px;
          }
          .glass-card {
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.05);
          }
          .text-gradient {
            background: linear-gradient(135deg, #00d4ff 0%, #8b5cf6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .btn-glow:hover {
            box-shadow: 0 0 25px rgba(0, 212, 255, 0.5);
          }
          .asymmetric-gradient {
            background: linear-gradient(135deg, #00d4ff 0%, #00c3eb 100%);
          }
          details summary::-webkit-details-marker {
            display: none;
          }
          .hero-glow {
            text-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
          }
        `}} />
      </head>
      <body className="bg-background text-on-background font-body selection:bg-primary selection:text-on-primary overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}