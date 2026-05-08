import { Form } from 'antd';
import React from 'react';

type Props = {
  children?: any;
  name?: string;
  label?: string;
  rules?: any;
  valuePropName?: string;
};

const FormItem: React.FC<Props> = ({ children, name, label, rules, valuePropName }: Props) => {
  return (
    <Form.Item
      name={name}
      label={label}
      required={false}
      rules={rules}
      valuePropName={valuePropName}
    >
      {children}
    </Form.Item>
  );
};

export default FormItem;
