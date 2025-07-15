import BuscarIcon from '@/icons/BuscarIcon';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { ComponentPropsWithoutRef, MouseEvent, ReactElement, useMemo, useState } from 'react';
import Input from './Input';
import styles from './Table.module.css';

interface TableColumnBase {
  // @TODO: deberiamos aceptar otra prop del estilo `headerComponent` o similar,
  //   para los casos en los que se necesite un componente en vez de un string.
  title: string | ReactElement;
  align?: 'left' | 'center' | 'right';
  searchable?: boolean;
}

interface TableColumnValue<RowT> extends TableColumnBase {
  value: keyof RowT;
  renderer?: never;
}

interface TableColumnRenderer<RowT> extends TableColumnBase {
  value?: never;
  renderer: (item: RowT, rowIndex: number) => ReactElement;
}

type TableColumn<RowT> = TableColumnValue<RowT> | TableColumnRenderer<RowT>;

interface TablePropsBase<RowT extends object> extends ComponentPropsWithoutRef<'table'> {
  onRowClick?: (item: RowT, rowIndex: number, event: MouseEvent<HTMLTableRowElement>) => void;
  highlightedRows?: number[];
  enableGlobalFilter?: boolean;
  globalFilterPlaceholder?: string;
  onGlobalFilterChange?: (filterValue: string) => void;
}

interface PropBasedTableProps<RowT extends object> extends TablePropsBase<RowT> {
  headers: TableColumn<RowT>[];
  items: RowT[];
  children?: never;
}

interface ChildrenBasedTableProps<RowT extends object> extends TablePropsBase<RowT> {
  headers: TableColumnBase[];
  items?: never;
  children?: ReactElement | ReactElement[];
}

type TableProps<RowT extends object> = PropBasedTableProps<RowT> | ChildrenBasedTableProps<RowT>;

const Table = <RowT extends object>({
  headers,
  items,
  children,
  onRowClick,
  highlightedRows,
  enableGlobalFilter = false,
  globalFilterPlaceholder = '',
  onGlobalFilterChange,
  ...rest
}: TableProps<RowT>) => {
  const rowsToHighlight = useMemo(() => new Set(highlightedRows), [highlightedRows]);

  const [globalFilter, setGlobalFilter] = useState<string>('');

  const handleGlobalFilterChange = (value: string) => {
    setGlobalFilter(value);
    onGlobalFilterChange?.(value);
  };

  const columnHelper = createColumnHelper<RowT>();

  const columns = useMemo(() => {
    if (children || !items) {
      return headers.map((header, index) =>
        columnHelper.display({
          id: `column-${index}`,
          header: () => header.title,
          cell: () => null,
          meta: { align: header.align || 'left' } as any,
        }),
      );
    }

    return headers.map((header, index) => {
      const column = header as TableColumn<RowT>;

      return columnHelper.accessor((row: RowT) => (column.value ? row[column.value] : row), {
        id: `column-${index}`,
        header: () => column.title,
        cell: (info) => {
          const item = info.row.original;
          const rowIndex = info.row.index;

          if (column.renderer) {
            return column.renderer(item, rowIndex);
          }

          if (column.value) {
            return <>{item[column.value]}</>;
          }

          return null;
        },
        meta: { align: column.align || 'left' } as any,
      });
    });
  }, [headers, items, children, columnHelper]);

  const table = useReactTable({
    data: items || [],
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: handleGlobalFilterChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: enableGlobalFilter ? getFilteredRowModel() : undefined,
    globalFilterFn: (row, columnId, filterValue) => {
      const searchValue = String(filterValue).toLowerCase();

      return headers.some((header) => {
        const col = header as TableColumn<RowT>;

        if (col.searchable === false) return false;

        if (col.value) {
          const cellValue = String(row.original[col.value] || '').toLowerCase();
          return cellValue.includes(searchValue);
        }

        return false;
      });
    },
  });

  return (
    <table className={styles.table} {...rest}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className={styles[(header.column.columnDef.meta as any)?.align || 'left']}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
            {enableGlobalFilter && (
              <th className={styles.filterHeader}>
                <Input
                  variantSize="sm"
                  placeholder={globalFilterPlaceholder}
                  value={globalFilter}
                  onChange={(e) => handleGlobalFilterChange(e.target.value)}
                  className={styles.filterInput}
                  icon={BuscarIcon}
                  iconPosition="left"
                  inverted
                />
              </th>
            )}
          </tr>
        ))}
      </thead>
      <tbody>
        {children
          ? children
          : table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={clsx(rowsToHighlight.has(row.index) && styles.highlighted)}
                onClick={(event) => onRowClick?.(row.original, row.index, event)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={styles[(cell.column.columnDef.meta as any)?.align || 'left']}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                {enableGlobalFilter && <td className={styles.filterCell}></td>}
              </tr>
            ))}
      </tbody>
    </table>
  );
};

export default Table;
