export const metadata = {
  title: 'Savi Silks',
  description: 'Admin panel with Supabase auth + RLS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
