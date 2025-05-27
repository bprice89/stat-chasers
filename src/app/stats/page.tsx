'use client';

import { useEffect, useState } from 'react';
import Papa from 'papaparse';

type PlayerRow = Record<string, string>;

export default function StatsPage() {
  const [data, setData] = useState<PlayerRow[]>([]);

  useEffect(() => {
    fetch('/data/passing-gross-yards.csv')
      .then((res) => res.text())
      .then((text) => {
        const parsed = Papa.parse(text, { header: true });
        setData(parsed.data as PlayerRow[]);
      });
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Player Stats</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              {data[0] &&
                Object.keys(data[0]).map((key) => (
                  <th key={key} className="border p-2 bg-gray-100 text-left">
                    {key}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((val, j) => (
                  <td key={j} className="border p-2">
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
