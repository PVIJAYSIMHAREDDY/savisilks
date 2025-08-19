export const metadata = {
  title: "Shop Admin",
  description: "Admin panel with Supabase auth + RLS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
