/* eslint-disable react/jsx-no-duplicate-props */
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React from 'react';
import { defaultConfig } from './config';

import { wordCount } from '@/utils/func';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { useAccess } from '@umijs/max';
import { Col, Descriptions, Row } from 'antd';

const Editor: React.FC<{
  value?: string;
  onChange?: (a: unknown) => unknown;
  uploadImage?: (a: File) => unknown;
}> = ({ value = "", onChange = () => {}, uploadImage }) => {
  const isAdmin = useAccess().admin;
  return (
    <>
      <CKEditor
        onReady={(editor) => {
          console.log('Editor is ready to use!', editor);
          // Insert the toolbar before the editable area.
          if (editor) {
            editor?.ui
              ?.getEditableElement?.()
              ?.parentElement.insertBefore(
                editor?.ui?.view?.toolbar?.element,
                editor?.ui.getEditableElement(),
              );
          }
        }}
        data={value ?? ""}
        onChange={(event) => console.log(event)}
        editor={DecoupledEditor}
        config={defaultConfig(uploadImage)}
        onChange={(_, editor) => {
          onChange(editor.getData());
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
      />
      {!!value && isAdmin && (
        <>
          <br />
          <Row justify="end">
            <Col>
              <Descriptions
                bordered
                size="small"
                items={[
                  {
                    key: '1',
                    label: 'Tổng số từ trong bài viết',
                    children: wordCount(value),
                  },
                ]}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Editor;
