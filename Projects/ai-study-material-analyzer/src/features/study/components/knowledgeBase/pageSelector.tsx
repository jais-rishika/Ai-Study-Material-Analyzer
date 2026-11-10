'use client';

import {useState} from "react";

export default function PageSelector() {

  const [selectedOption, setSelectedOption] = useState(true);
  const handleAllSelection=(e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption((prev) => !prev);
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Pages to study
      </label>
      <label htmlFor="allPages" className="mb-1 block text-xs text-slate-400">ALL</label>
      <input type="checkbox" name="allPages" className="mr-2" onChange={handleAllSelection} checked={selectedOption} />

      {!selectedOption && (
        <>
          <p className="mt-2 text-xs text-slate-400">
            Select a range of pages from your PDF.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="fromPage" className="mb-1 block text-xs text-slate-400">From</label>
              <input
                name="fromPage"
                type="number"
                min="1"
                placeholder="1"
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label htmlFor="toPage" className="mb-1 block text-xs text-slate-400">To</label>
              <input
                name="toPage"
                type="number"
                min="1"
                placeholder="10"
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}