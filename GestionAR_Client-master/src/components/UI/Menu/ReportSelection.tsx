import React from 'react';
import { ALL_REPORTS_OPTIONS } from '../../../utils/constants';

type Props = {
  handleReportPick: (report: string) => void;
};

const GradeSelection = ({ handleReportPick }: Props) => {
  return (
    <div>
      {React.Children.toArray(
        ALL_REPORTS_OPTIONS.map((menu_option) => (
          <button
            className="border border-black rounded-lg bg-white min-w-max w-full p-3 my-2"
            onClick={() => handleReportPick(menu_option.title)}
          >
            {menu_option.title}
          </button>
        ))
      )}
    </div>
  );
};

export default GradeSelection;
