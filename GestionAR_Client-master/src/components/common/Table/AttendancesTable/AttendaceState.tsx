import Badge, { Size, Variant } from '../../../UI/Badge/Badge';

type Props = {
  student_id: string;
  state: boolean;
  handleClick: (student_id: string, state: boolean) => void;
};

export const AttendanceState = ({ student_id, state, handleClick }: Props) => {
  return (
    <div key={student_id} className="flex flex-row justify-between">
      <Badge
        size={Size.SMALL}
        variant={state ? Variant.SUCCESS : Variant.GRAY}
        handleBadgeClick={() => handleClick(student_id, true)}
      >
        <p className="font-sen-bold capitalize text-gray-600 cursor-pointer">Presente</p>
      </Badge>
      <Badge
        size={Size.SMALL}
        variant={state ? Variant.GRAY : Variant.ERROR}
        handleBadgeClick={() => handleClick(student_id, false)}
      >
        <p className="font-sen-bold capitalize text-gray-600 cursor-pointer">Ausente</p>
      </Badge>
    </div>
  );
};
