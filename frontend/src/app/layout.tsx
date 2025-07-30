export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ minHeight: '100vh', backgroundColor: '#f7fafc', margin: 0, padding: 0, fontFamily: 'Inter, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
