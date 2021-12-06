import { FC } from 'react';

interface Props {
  children?: React.ReactNode;
}

const TableHead: FC<Props> = ({ children }: Props) => {
  return <thead className="border-b border-gray-400 border-solid bg-gray-50 dark:bg-gray-900">{children}</thead>;
};

export default TableHead;
