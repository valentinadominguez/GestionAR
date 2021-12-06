import { TableRow } from '../../../UI/Table';

const StudentsQualificationTableBodyRow = ({ studentQualification }) => {
  const { student, completed } = studentQualification;

  return (
    <TableRow>
      <td className="py-4"></td>
      <td>
        <div className="text-sm">
          {student.lastname}, {student.firstname}
        </div>
      </td>
      <td>
        <div className="text-sm">{student.regristration_number}</div>
      </td>
      <td>
        <div className="text-sm">{completed}</div>
      </td>
    </TableRow>
  );
};

export default StudentsQualificationTableBodyRow;
