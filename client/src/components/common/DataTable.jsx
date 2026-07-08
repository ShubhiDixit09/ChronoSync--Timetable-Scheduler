import React from 'react';

// columns: [{ key, label }], rows: array of objects
export default function DataTable({ columns, rows, onEdit, onDelete }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key} style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>
              {c.label}
            </th>
          ))}
          {(onEdit || onDelete) && <th></th>}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row._id}>
            {columns.map((c) => (
              <td key={c.key} style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                {row[c.key]}
              </td>
            ))}
            {(onEdit || onDelete) && (
              <td>
                {onEdit && <button onClick={() => onEdit(row)}>Edit</button>}
                {onDelete && <button onClick={() => onDelete(row)}>Delete</button>}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
