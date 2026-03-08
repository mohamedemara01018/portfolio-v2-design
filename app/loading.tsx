import React from 'react';
import Loading from '@/components/loading/Loading';

export default function RootLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Loading label="Loading Mohamed's Portfolio..." size={80} />
    </div>
  );
}