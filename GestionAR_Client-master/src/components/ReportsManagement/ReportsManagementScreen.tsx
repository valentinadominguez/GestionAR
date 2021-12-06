import { useCallback, useState } from 'react';
import ArrowLeftIcon from '@heroicons/react/solid/ArrowLeftIcon';
import { useHistory } from 'react-router';
import ReportSelection from '../UI/Menu/ReportSelection';

const ReportsManagementScreen = () => {
  const history = useHistory();
  const [step, setStep] = useState(0);
  const [selectedReport, setSelectedReport] = useState<string>(null);

  const handleReportPick = useCallback(
    (report: string) => {
      setSelectedReport(report);
      //   setStep((prevValue) => prevValue + 1);
    },
    [setStep, setSelectedReport]
  );

  const handleGoBack = () => {
    if (step === 1 || step === 2) {
      setStep((prevValue) => prevValue - 1);
    } else {
      history.goBack();
    }
  };

  let component = <></>;
  //! TO.DO Agregar <ReportSubSection /> para Reportes que sean por año.
  //   if (step === 0) component = <ReportSelection handleReportPick={handleReportPick} />;

  return (
    <div className="flex flex-col flex-1 items-center justify-center h-screen bg-yellow-100">
      <div className="fixed top-2 left-2">
        <ArrowLeftIcon className="w-8 h-8 text-gray-500 cursor-pointer" onClick={handleGoBack} />
      </div>
      <h1 className="mb-10 text-2xl font-bold uppercase">Gestion de Reportes</h1>
      <div className="flex justify-center">
        <ReportSelection handleReportPick={handleReportPick} />;
      </div>
    </div>
  );
};

export default ReportsManagementScreen;
