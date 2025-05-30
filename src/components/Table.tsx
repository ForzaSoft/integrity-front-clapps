import clsx from 'clsx';
import { ComponentPropsWithoutRef, MouseEvent, ReactElement, useMemo } from 'react';
import styles from './Table.module.css';

interface TableColumnBase {
  // @TODO: deberiamos aceptar otra prop del estilo `headerComponent` o similar,
  //   para los casos en los que se necesite un componente en vez de un string.
  title: string | ReactElement;
  align?: 'left' | 'center' | 'right';
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
  ...rest
}: TableProps<RowT>) => {
  const rowsToHighlight = useMemo(() => new Set(highlightedRows), [highlightedRows]);

  return (
    <table className={styles.table} {...rest}>
      <thead>
        <tr>
          {headers.map(({ title, align = 'left' }, index) => (
            <th key={`header-${index}`} className={styles[align]}>
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {children ||
          items?.map((item, rowIndex) => (
            <tr
              key={`row-${rowIndex}`}
              className={clsx(rowsToHighlight.has(rowIndex) && styles.highlighted)}
              onClick={(event) => onRowClick?.(item, rowIndex, event)}
            >
              {headers.map(({ value, renderer, align = 'left' }, colIndex) => (
                <td key={`col-${colIndex}`} className={styles[align]}>
                  {renderer?.(item, rowIndex) ?? <>{value && item[value]}</>}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
