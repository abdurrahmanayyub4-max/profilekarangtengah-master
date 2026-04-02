// app/admin/layout.tsx
import './globals.css';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';

export const metadata = {
  title: "Admin Karangtengah",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}