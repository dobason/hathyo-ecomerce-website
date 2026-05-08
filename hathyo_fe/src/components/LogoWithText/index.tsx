import React from 'react';

type Props = {
  width: number;
  height: number;
};

const LogoWithText: React.FC<Props> = ({ width = 448, height = 113 }: Props) => {
  return <img src="/icons/logo.svg" alt="text logo" width={width} height={height} />;
};

export default LogoWithText;
