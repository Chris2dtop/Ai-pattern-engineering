"use client";

import { useState } from "react";

type EditableTableProps = {
  columns: string[];
  rows: string[][];
};

export function EditableTable({ columns, rows }: EditableTableProps) {
  const [tableRows, setTableRows] = useState(rows);

  function updateCell(rowIndex: number, columnIndex: number, value: string) {
    setTableRows((current) =>
      current.map((row, index) =>
        index === rowIndex
          ? row.map((cell, cellIndex) =>
              cellIndex === columnIndex ? value : cell,
            )
          : row,
      ),
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border border-line">
      <table className="w-full min-w-[680px] border-collapse text-sm">
        <thead className="bg-paper text-left">
          <tr>
            {columns.map((column) => (
              <th key={column} className="border-b border-line px-3 py-2 font-semibold">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-line last:border-b-0">
              {row.map((cell, columnIndex) => (
                <td key={`${rowIndex}-${columnIndex}`} className="px-2 py-2">
                  <input
                    className="w-full rounded border border-transparent bg-transparent px-2 py-1 outline-none focus:border-denim focus:bg-paper"
                    value={cell}
                    onChange={(event) =>
                      updateCell(rowIndex, columnIndex, event.target.value)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
