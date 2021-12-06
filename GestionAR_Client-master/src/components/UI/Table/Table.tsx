interface Props {
  children?: React.ReactNode;
}

const Table = ({ children }: Props) => {
  return (
    <table className="shadow border-b border-gray-200 min-w-full divide-y divide-gray-200 dark:text-gray-300 dark:divide-gray-700 dark:bg-gray-900">
      {children}
    </table>
  );
};

export default Table;
