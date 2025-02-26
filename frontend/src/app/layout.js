import "../styles/globals.css";

export default function Layout({ children }) {
  return (
    <html lang="no">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
