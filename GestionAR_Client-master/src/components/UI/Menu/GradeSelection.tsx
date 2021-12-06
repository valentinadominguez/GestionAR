import React from 'react';
import { ALL_GRADES_OPTIONS } from '../../../utils/constants';

type Props = {
  handleGradePick: (grade: number) => void;
};

const GradeSelection = ({ handleGradePick }: Props) => {
  return (
    <div>
      <p className="text-left">Grado</p>
      {React.Children.toArray(
        ALL_GRADES_OPTIONS.map((menu_option, index) => (
          <button
            className="border border-black rounded-lg bg-white min-w-max w-full p-3 my-2"
            onClick={() => handleGradePick(index)}
          >
            {menu_option.title}
          </button>
        ))
      )}
    </div>
  );
};

export default GradeSelection;
