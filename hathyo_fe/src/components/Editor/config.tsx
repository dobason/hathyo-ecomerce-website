/* eslint-disable no-async-promise-executor */
import type BalloonEditor from '@ckeditor/ckeditor5-build-balloon-block';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import { FileLoader, UploadAdapter } from '@ckeditor/ckeditor5-upload/src/filerepository';
import { message } from 'antd';

function uploadAdapter(loader: FileLoader, mutate: any): UploadAdapter {
  return {
    upload: () => {
      return new Promise(async (resolve, reject) => {
        const res = await mutate(await loader.file);
        if (!res?.links?.permalink) {
          reject(res);
        }
        resolve({ default: res?.links?.permalink });
      });
    },
    abort: () => {
      message.error('Hình bạn vừa upload bị lỗi, vui lòng upload lại');
    },
  };
}

function uploadPlugin(editor: BalloonEditor, mutate: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return uploadAdapter(loader, mutate);
  };
}

export const defaultConfig = (mutate: any): EditorConfig => {
  return {
    title: {
      placeholder: 'Title here!',
    },
    toolbar: {
      // items: [
      //   'undo',
      //   'redo',
      //   'heading',
      //   '|',
      //   'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', 'highlight',
      //   '|',
      //   'bold',
      //   'italic',
      //   'strikethrough',
      //   'subscript',
      //   'superscript',
      //   'code',
      //   '|',
      //   'numberedList',
      //   'bulletedList',
      //   '|',
      //   'imageInsert',
      //   'link',
      //   'mediaEmbed',
      //   'blockQuote',
      //   'codeBlock',
      //   'todoList',
      //   'outdent',
      //   'indent',
      //   'insertTable',
      //   'fullScreen',
      // ],
    },
    language: 'en',
    // blockToolbar: {
    //   items: [
    //     'heading',
    //     '|',
    //     'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', 'highlight',
    //     '|',
    //     'bold',
    //     'italic',
    //     'strikethrough',
    //     'subscript',
    //     'superscript',
    //     'code',
    //     '|',
    //     'numberedList',
    //     'bulletedList',
    //     '|',
    //     'imageUpload',
    //     'link',
    //     'mediaEmbed',
    //     'blockQuote',
    //     'codeBlock',
    //     'todoList',
    //     'outdent',
    //     'indent',
    //     'insertTable',
    //     'fullScreen',
    //   ],
    //   icon: 'paragraph',
    // },
    image: {
      toolbar: [
        'imageTextAlternative',
        'toggleImageCaption',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side',
      ],
      upload: {
        types: ['jpeg', 'png'],
      },
    },
    extraPlugins: [
      function (editor) {
        uploadPlugin(editor as any, mutate);
      },
    ],
    wordCount: {
      onUpdate: (stats) => {
        console.log('ạksdhfbdjiksa');

        // Prints the current content statistics.
        console.log(`Characters: ${stats.characters}\nWords: ${stats.words}`);
      },
    },
  };
};
