import { TableRow } from '../../../UI/Table';

type Props = {
  student: any;
  redirectToProfile: (studentId: string) => void;
};

const StudentsTableBodyRow = ({ student, redirectToProfile }: Props) => {
  return (
    <TableRow
      className="cursor-pointer hover:bg-black hover:bg-opacity-20"
      onClick={() => redirectToProfile(student.id)}
    >
      <td className="py-4 pl-6">
        <div className="text-sm">
          {student.lastName}, {student.firstName}
        </div>
      </td>
      <td>
        <div className="text-sm">{student.registration_number}</div>
      </td>
      <td>
        <div className="text-sm">{student.section}</div>
      </td>
      <td className="pr-6">
        <div className="text-sm">{student.shift}</div>
      </td>
    </TableRow>
  );
};

export default StudentsTableBodyRow;
