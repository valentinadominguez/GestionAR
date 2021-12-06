import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { SortKey } from '../../../interfaces/Table';

interface ColumnHeaderProps {
  sortColumn?: (sortKey: SortKey) => () => void;
  sortKey?: SortKey;
  sortDirection?: string;
  sortingBy?: SortKey;
  children?: React.ReactNode;
  className?: string;
  isAction?: boolean;
}

const ColumnHeader = ({
  sortColumn,
  sortKey,
  sortDirection,
  sortingBy,
  children,
  className,
  isAction,
}: ColumnHeaderProps) => {
  const rootClassName = classNames(
    className,
    'py-3 bg-white text-left text-xs font-sen-bold uppercase tracking-wider dark:bg-gray-900 dark:text-primary-100'
  );

  return (
    <th scope="col" onClick={sortColumn ? sortColumn(sortKey) : null} className={rootClassName}>
      <div className={classNames('flex flex-row items-center', isAction && 'justify-end')}>
        <span
          className={classNames('mr-2', !!sortKey && sortKey === sortingBy ? 'text-primary-smb-500' : 'text-gray-600')}
        >
          {children}
        </span>
        {!!sortKey && sortKey === sortingBy ? (
          sortKey && sortDirection === '-1' ? (
            <ChevronDownIcon className="mx-1 h-5 w-5 text-primary-smb-500" aria-hidden="true" />
          ) : (
            <ChevronUpIcon className="h-5 mx-1 w-5 text-primary-smb-500" aria-hidden="true" />
          )
        ) : (
          !!sortKey && (
            <div className="p-2">
              <ChevronUpIcon className="h-3 w-3 -mb-1.5 text-gray-400" aria-hidden="true" />
              <ChevronDownIcon className="h-3 w-3 text-gray-400" aria-hidden="true" />
            </div>
          )
        )}
      </div>
    </th>
  );
};

export default ColumnHeader;
