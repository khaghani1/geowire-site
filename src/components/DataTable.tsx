'use client';
import { useState } from 'react';

interface Column {
  key: string;
  label: string;
  format?: (v: any) => string;
  color?: (v: any) => string;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  title?: string;
}

export default function DataTable({ columns, data, title }: DataTableProps) {
  const [sortKey, setSortKey] = useState('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter data based on search term
  const filtered = data.filter((row) =>
    columns.some((col) => {
      const val = String(row[col.key]).toLowerCase();
      return val.includes(searchTerm.toLowerCase());
    })
  );

  // Sort filtered data
  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    const av = a[sortKey];
    const bv = b[sortKey];
    const cmp =
      typeof av === 'number'
        ? av - bv
        : String(av).localeCompare(String(bv));
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div className="bg-bg-card border border-border rounded-lg overflow-hidden shadow-lg">
      {/* Title and controls */}
      <div className="border-b border-border bg-gradient-to-r from-bg-card via-bg-card to-bg-secondary/50 px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          {title && (
            <h3 className="text-txt-primary font-heading font-semibold text-lg">
              {title}
            </h3>
          )}
          <p className="text-txt-muted font-mono text-xs mt-1">
            {sorted.length} of {data.length} row{data.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Search/Filter input */}
        <div className="relative sm:w-64">
          <input
            type="text"
            placeholder="Search table..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-bg-primary border border-border rounded px-3 py-2 text-sm text-txt-primary placeholder-txt-muted font-mono focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/50 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-txt-dim hover:text-txt-secondary transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-secondary/40 sticky top-0">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col.key)}
                  className="px-4 py-3 text-left text-xs text-txt-secondary uppercase tracking-widest cursor-pointer hover:text-txt-primary hover:bg-accent-blue/10 select-none font-mono font-semibold transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span>{col.label}</span>
                    <span className="inline-block w-4 text-center transition-opacity duration-200">
                      {sortKey === col.key ? (
                        <span className="text-accent-blue font-black">
                          {sortDir === 'asc' ? '▲' : '▼'}
                        </span>
                      ) : (
                        <span className="opacity-0 group-hover:opacity-50">
                          ⇅
                        </span>
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.length > 0 ? (
              sorted.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-border transition-all duration-150 ${
                    i % 2 === 0
                      ? 'bg-bg-card/50 hover:bg-bg-card-hover'
                      : 'bg-bg-secondary/20 hover:bg-bg-card-hover'
                  } group`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-4 py-3 font-mono text-sm transition-colors duration-150 ${
                        col.color
                          ? col.color(row[col.key])
                          : 'text-txt-primary'
                      }`}
                    >
                      {col.format ? col.format(row[col.key]) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-txt-muted font-mono"
                >
                  {searchTerm
                    ? 'No results match your search'
                    : 'No data available'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer info */}
      {sorted.length > 0 && (
        <div className="border-t border-border bg-bg-secondary/30 px-4 py-2 text-xs text-txt-muted font-mono">
          Showing {sorted.length} result{sorted.length !== 1 ? 's' : ''}
          {searchTerm && ` for "${searchTerm}"`}
        </div>
      )}
    </div>
  );
}
