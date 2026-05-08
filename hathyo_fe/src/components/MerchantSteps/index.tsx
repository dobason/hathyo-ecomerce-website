import { Steps } from 'antd';
import React from 'react';

type Props = {
  current: number;
  stepCompleted: number;
  setCurrent: any;
};
const MerchantSteps: React.FC<Props> = ({ current = 0, setCurrent, stepCompleted }: Props) => {
  const changeCurrent = (value: number) => {
    if (value === 3 && stepCompleted < 3) {
      return;
    }
    setCurrent(value);
  };

  return (
    <Steps
      onChange={changeCurrent}
      current={current}
      items={[
        {
          title: 'Thông tin shop',
          status: current === 0 ? 'process' : stepCompleted > 0 ? 'finish' : 'wait',
        },
        {
          title: 'Thông tin thuế',
          status: current === 1 ? 'process' : stepCompleted >= 1 ? 'finish' : 'wait',
        },
        {
          title: 'Thông tin định danh',
          status: current === 2 ? 'process' : stepCompleted >= 2 ? 'finish' : 'wait',
        },
        {
          title: 'Hoàn thành',
          status: current === 3 ? 'process' : stepCompleted >= 3 ? 'finish' : 'wait',
        },
      ]}
    />
  );
};

export default MerchantSteps;
