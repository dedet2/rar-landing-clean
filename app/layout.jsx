
import "../styles/globals.css";

export const metadata = {
  title: "Rest as Resistance — Luxury Healing Journey in Japan",
  description: "Dec 8–17, 2025 • Tokyo • Kamakura • Beppu • Miyajima",
};

export default function RootLayout({ children }) {
  const GA = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en">
      <body>
        {children}
        {GA ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA}`}></script>
            <script dangerouslySetInnerHTML={{__html:`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date()); gtag('config','${GA}');
            `}}/>
          </>
        ) : null}
      </body>
    </html>
  );
}
