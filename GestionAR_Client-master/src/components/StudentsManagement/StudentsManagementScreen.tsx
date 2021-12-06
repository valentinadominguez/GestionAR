import React, { useState, useCallback } from 'react';
import { ALL_GRADES_OPTIONS } from '../../utils/constants';
import GradeSelection from '../UI/Menu/GradeSelection';
import StudentsTable from '../common/Table/StudentsTable/StudentsTable';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { useHistory } from 'react-router';

const StudentsManagementScreen = () => {
  const history = useHistory();
  const [step, setStep] = useState(0);
  const [selectedGradeIndex, setSelectedGradeIndex] = useState<number>(null);

  const handleGradePick = useCallback(
    (index: number) => {
      setSelectedGradeIndex(index);
      setStep((prevValue) => prevValue + 1);
    },
    [setStep, setSelectedGradeIndex]
  );

  const handleGoBack = () => {
    if (step === 1) {
      setStep((prevValue) => prevValue - 1);
    } else {
      history.goBack();
    }
  };

  let component = <></>;

  if (step === 0) component = <GradeSelection handleGradePick={handleGradePick} />;
  if (step === 1) component = <StudentsTable gradeNumber={selectedGradeIndex + 1} />;

  return (
    <div className="flex flex-col flex-1 items-center justify-center h-screen bg-yellow-100">
      <div className="fixed top-2 left-2">
        <ArrowLeftIcon className="w-8 h-8 text-gray-500 cursor-pointer" onClick={handleGoBack} />
      </div>
      <h1 className="mb-10 text-2xl font-bold uppercase">
        Gestion de Alumnos{selectedGradeIndex !== null ? `: ${ALL_GRADES_OPTIONS[selectedGradeIndex].title} Grado` : ''}
      </h1>
      {component}
    </div>
  );
};

export default StudentsManagementScreen;
