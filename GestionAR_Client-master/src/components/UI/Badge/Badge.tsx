import React, { ReactNode } from 'react';
import classNames from 'classnames';

export enum Size {
  SMALL = 'SMALL',
  LARGE = 'LARGE',
}

export enum Variant {
  GRAY = 'GRAY',
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
  INFO = 'INFO',
  ERROR = 'ERROR',
}

type Props = {
  variant: Variant;
  size: Size;
  handleBadgeClick?: () => void;
  children?: ReactNode;
};

const SIZE_MAPS: Record<Size, string> = {
  [Size.SMALL]: 'px-2 py-0.5 text-xs',
  [Size.LARGE]: 'px-3 py-1 text-base',
};

const DOT_COLOR: Record<Variant, string> = {
  [Variant.GRAY]: 'text-gray-400',
  [Variant.PRIMARY]: 'text-red-800',
  [Variant.SECONDARY]: 'text-secondary-800',
  [Variant.SUCCESS]: 'text-green-400',
  [Variant.ERROR]: 'text-red-500',
  [Variant.INFO]: 'text-blue-800',
  [Variant.WARNING]: 'text-yellow-800',
};

const VARIANT_MAPS: Record<Variant, string> = {
  [Variant.GRAY]: 'bg-gray-300',
  [Variant.PRIMARY]: 'bg-primary-100',
  [Variant.SECONDARY]: 'bg-secondary-100',
  [Variant.SUCCESS]: 'bg-green-100',
  [Variant.ERROR]: 'bg-red-100',
  [Variant.INFO]: 'bg-blue-100',
  [Variant.WARNING]: 'bg-yellow-100',
};

export function Badge(props: Props) {
  const { children, size, variant, handleBadgeClick } = props;
  return (
    <span
      className={classNames(
        'inline-flex items-center rounded font-medium whitespace-no-wrap',
        SIZE_MAPS[size],
        VARIANT_MAPS[variant]
      )}
      onClick={handleBadgeClick && handleBadgeClick}
    >
      <svg className={classNames('mr-1.5 h-2 w-2', DOT_COLOR[variant])} fill="currentColor" viewBox="0 0 8 8">
        <circle cx="4" cy="4" r="3" />
      </svg>
      {children}
    </span>
  );
}

Badge.size = Size;
Badge.variant = Variant;
Badge.defaultProps = {
  variant: Variant.GRAY,
  size: Size.SMALL,
};

export default Badge;
