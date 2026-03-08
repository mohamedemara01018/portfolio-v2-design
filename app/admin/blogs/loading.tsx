import React from 'react';
import Loading from '@/components/loading/Loading';

export default function AdminLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <Loading label="Fetching Blog data..." size={50} />
    </div>
  );
}