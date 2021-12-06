import { FC } from 'react';

interface Props {
  children?: any;
}

const TableBody: FC<Props> = ({ children }: Props) => {
  return <tbody className="bg-white divide-y divide-gray-400 dark:bg-gray-900 dark:divide-gray-700">{children}</tbody>;
};

export default TableBody;
