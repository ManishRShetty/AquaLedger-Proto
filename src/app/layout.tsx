import type { Metadata } from 'next';
import './globals.css';
import { AppLayout } from '@/components/layout/AppLayout';
import { Toaster } from "@/components/ui/toaster"
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';


export const metadata: Metadata = {
  title: 'AquaLedger',
  description: 'Traceable, Sustainable, Trustworthy Seafood',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ReactQueryProvider>
          <AppLayout>
            {children}

            <Toaster />
          </AppLayout>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
