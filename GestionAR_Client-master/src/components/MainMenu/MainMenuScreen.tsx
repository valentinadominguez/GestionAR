import React from 'react';
import { useHistory } from 'react-router';
import { MAIN_MENU_OPTIONS, NAVIGATOR } from '../../utils/constants';

const MainMenuScreen = () => {
  const history = useHistory();
  const handleRedirect = (nextScreen: string) => history.push(nextScreen, { from: NAVIGATOR.main });

  return (
    <div className="flex flex-col flex-1 items-center justify-center h-screen bg-yellow-100">
      <h1 className="mb-10 text-2xl font-bold uppercase">Menu Principal</h1>
      <div>
        {React.Children.toArray(
          MAIN_MENU_OPTIONS.map(({ nextScreen, title }) => (
            <button
              className="border border-black rounded-lg bg-white min-w-max w-full p-3 my-2"
              onClick={() => handleRedirect(nextScreen)}
            >
              {title}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default MainMenuScreen;
