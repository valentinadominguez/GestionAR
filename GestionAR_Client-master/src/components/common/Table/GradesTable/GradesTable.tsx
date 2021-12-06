import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router';
import { GRADES_COLUMNS } from '../../../../utils/constants';
import { ColumnHeader, Table, TableBody, TableHead, TableRow } from '../../../UI/Table';
import GradesTableBodyRow from './GradesTableBodyRow';
import { SortKey } from '../../../../interfaces/Table';
import { useGrades } from '../../../../hooks/useGrades';

type Props = {
  grade?: any;
  subject?: any;
  handleGradePick: (grade: any) => void;
};

const GradesTable = ({ grade, subject, handleGradePick }: Props) => {
  const history = useHistory();
  const [sortBy, setSortBy] = useState<SortKey>('');
  const [sortOrder, setSortOrder] = useState('');

  const { data, isLoading, isSuccess, isError } = useGrades();

  const grades = useMemo(() => {
    return data ?? [];
  }, [data]);

  /**
   * Called when table heading is clicked.
   * @param {SortKey} sortKey - value for what column to sort by
   */
  const handleSort = (sortKey: SortKey) => () => {
    if (!sortKey) {
      return;
    }

    let newSortDirection;

    // Default sort to -1 if we are sorting by a different key than we previously were
    if (sortKey !== sortBy) {
      newSortDirection = '-1';
    } else {
      // If toggling the same sort, switch the order
      newSortDirection = sortOrder === '-1' ? '1' : '-1';
    }

    setSortBy(sortKey);
    setSortOrder(newSortDirection);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Table>
      <TableHead>
        <TableRow>
          {GRADES_COLUMNS.map((column, index) =>
            column.sortKey ? (
              <ColumnHeader
                key={index}
                sortKey={column.sortKey}
                sortingBy={sortBy}
                sortDirection={sortOrder}
                sortColumn={handleSort}
                className={classNames(
                  'cursor-pointer',
                  index === 0 && 'pl-6',
                  index === GRADES_COLUMNS.length - 1 && 'pr-6'
                )}
              >
                {column.title}
              </ColumnHeader>
            ) : (
              <ColumnHeader key={index} isAction={true} className={index === GRADES_COLUMNS.length - 1 && 'pr-6'}>
                {column.title}
              </ColumnHeader>
            )
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {!grades.length && (
          <tr>
            <td colSpan={GRADES_COLUMNS.length}>
              <div className="p-4 text-sm text-center font-bold">No Data Found</div>
            </td>
          </tr>
        )}
        {grades.map((grade) => (
          <GradesTableBodyRow key={grade.id} grade={grade} handleGradePick={handleGradePick} />
        ))}
      </TableBody>
    </Table>
  );
};

export default GradesTable;
