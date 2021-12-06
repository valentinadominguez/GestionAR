import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ATTENDANCES_COLUMNS } from '../../../../utils/constants';
import { ColumnHeader, Table, TableBody, TableHead, TableRow } from '../../../UI/Table';
import AttendancesTableBodyRow from './AttendancesTableBodyRow';
import { SortKey } from '../../../../interfaces/Table';
import { useAttendances } from '../../../../hooks/useAttendances';
import { useStudents } from '../../../../hooks/useStudents';
import { useGenerateAttendaces } from '../../../../hooks/useGenerateAttendaces';
import { useHistory } from 'react-router';

type Props = {
  grade: any;
  subject: any;
};

const AttendancesTable = ({ grade, subject }: Props) => {
  const history = useHistory();

  const [sortBy, setSortBy] = useState<SortKey>('');
  const [sortOrder, setSortOrder] = useState('');

  const [formValues, setFormValues] = useState<any>([]);

  const { data, isLoading, isSuccess, isError } = useStudents(grade?.id);

  useEffect(() => {
    if (isSuccess && data) {
      //set form values for Today attendance
      const values = data.map((std) => ({
        student_id: std._id,
        student_name: std.lastName + ', ' + std.firstName,
        registration_number: std.registration_number,
        state: false,
      }));

      setFormValues(values);
    }
  }, [isSuccess, data]);

  const handleClick = (student_id: string, state: boolean) => {
    const valueIndex = formValues.findIndex((form) => form.student_id === student_id);

    if (valueIndex !== -1) {
      const selectedAttendance = formValues[valueIndex];
      setFormValues((prevState) => [
        ...prevState.slice(0, valueIndex),
        { ...selectedAttendance, state },
        ...prevState.slice(valueIndex + 1),
      ]);
    }
  };

  const handleSubmit = () => {
    const request = formValues.map((val) => ({
      student_id: val.id,
      subject_id: subject.id,
      state: val.value,
    }));

    generateAttendances(request);

    //! To.DO Add mutation for attendance creation.
  };

  // Este es para editar asistencias. Necesitamos manejar fechas tambien, si es el dia de hoy,
  // entonces traemos los alumnos, si no traemos las asistencias
  // const { data, isLoading } = useAttendances(grade?.id, subject?.id, new Date());

  const {
    mutateAsync: generateAttendances,
    isLoading: isLoadingMutation,
    isSuccess: isSuccessMutation,
    isError: isErrorMutation,
  } = useGenerateAttendaces();

  useEffect(() => {
    if (isSuccessMutation) {
      history.goBack();
    }
  }, [isSuccessMutation]);

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
    <div>
      <Table>
        <TableHead>
          <TableRow>
            {ATTENDANCES_COLUMNS.map((column, index) =>
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
                    index === ATTENDANCES_COLUMNS.length - 1 && 'pr-6'
                  )}
                >
                  {column.title}
                </ColumnHeader>
              ) : (
                <ColumnHeader
                  key={index}
                  isAction={true}
                  className={index === ATTENDANCES_COLUMNS.length - 1 && 'pr-6'}
                >
                  {column.title}
                </ColumnHeader>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {!formValues.length && (
            <tr>
              <td colSpan={ATTENDANCES_COLUMNS.length}>
                <div className="p-4 text-sm text-center font-bold">No Data Found</div>
              </td>
            </tr>
          )}
          {formValues.map((attendance) => (
            <AttendancesTableBodyRow
              isForm
              key={formValues.student_id}
              attendance={attendance}
              handleClick={handleClick}
            />
          ))}
        </TableBody>
      </Table>
      <div>
        <button className="border bg-blue-400 rounded min-w-max w-full p-3 my-8" onClick={handleSubmit}>
          Finalizar Asistencia
        </button>
      </div>
    </div>
  );
};

export default AttendancesTable;
