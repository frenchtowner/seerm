import "../styles/globals.css";

export const metadata = {
  title: "Connect Tree",
  description: "CRM with personality (and maybe too much of it)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
