import React from 'react';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type PhotoUserProps = {
  width?: number;
  height?: number;
};

export default function PhotoUser({ width = 50, height = 50 }: PhotoUserProps) {
  return (
    <div>
      <FontAwesomeIcon icon={faCircleUser} width={width} height={height} />
    </div>
  );
}