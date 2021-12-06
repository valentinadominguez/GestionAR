interface Props {
  key?: string;
  children?: React.ReactNode;
  // All other props
  [x: string]: any;
}

const TableRow = ({ children, ...rest }: Props) => {
  return (
    <tr className="dark:bg-gray-900 dark:hover:bg-primary-900 " {...rest}>
      {children}
    </tr>
  );
};

export default TableRow;
