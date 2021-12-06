import React from 'react';
import { useSubjects } from '../../../hooks/useSubjects';

type SubjectSelectionProps = {
  handleSubjectPick: (subject) => void;
  gradeNumber: number;
};

const SubjectSelection = ({ handleSubjectPick, gradeNumber }: SubjectSelectionProps) => {
  const { data: subjects, isLoading } = useSubjects(gradeNumber);

  if (isLoading) return <p>loading...</p>;

  return (
    <div>
      <p className="text-left">Materia</p>
      {React.Children.toArray(
        subjects.map((subject) => (
          <button
            className="border border-black rounded-lg bg-white min-w-max w-full p-3 my-2 hover:bg-black hover:bg-opacity-20"
            onClick={() => handleSubjectPick(subject)}
          >
            {subject.name}
          </button>
        ))
      )}
    </div>
  );
};

export default SubjectSelection;
