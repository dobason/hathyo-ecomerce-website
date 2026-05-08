import { SelectLang as UmiSelectLang, getLocale } from '@umijs/max';

export type SiderTheme = 'light' | 'dark';

export const SelectLang = () => {
  return (
    <UmiSelectLang
      style={{
        padding: 4,
      }}
      icon={getLocale() === 'vi-VN' ? '🇻🇳' : '🇺🇸'}
    />
  );
};
