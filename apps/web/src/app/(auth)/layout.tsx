import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-surface-muted">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link href="/" className="inline-flex items-center gap-2 justify-center">
          <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shadow-sm">
            <Image
              src="/logo.jpeg"
              alt="Logo PT. Sejahtera Abadi Bersama"
              width={44}
              height={44}
              className="object-contain"
            />
          </div>
        </Link>
        <h2 className="text-xl font-bold text-primary">
          PT. Sejahtera Abadi Bersama
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Portal Sistem Informasi LPK Terpadu
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        {children}
      </div>
    </div>
  );
}
