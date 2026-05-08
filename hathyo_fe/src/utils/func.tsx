import { DeleteTwoTone } from '@ant-design/icons';
import { useLocation } from '@umijs/max';
import { GetProp, Popconfirm, Typography, UploadProps } from 'antd';
import { compact, isEmpty, map } from 'lodash';
import slugify from 'slugify';

const { Paragraph } = Typography;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const parseJwt = (token: string) => {
  try {
    return JSON.parse(token);
  } catch (e) {
    return null;
  }
};

export async function jwtDecode(accessToken: string) {
  const base64Url = accessToken.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return parseJwt(jsonPayload);
}

export function useTableUrlParams() {
  const router = useLocation();
  const urlSearchParams = new URLSearchParams(router.search);
  return {
    page: Number(urlSearchParams.get('page')) || 1,
    size: Number(urlSearchParams.get('size')) || 10,
    q: urlSearchParams.get('q') || '',
    type: urlSearchParams.get('type') || '',
    topic: urlSearchParams.get('topic') || '',
    createdFrom: urlSearchParams.get('createdFrom') || undefined,
    createdTo: urlSearchParams.get('createdTo') || undefined,
    shopCategoryId: urlSearchParams.get('shopCategoryId') || '',
    status: urlSearchParams.get('status') || 'ALL',
    categoryId: urlSearchParams.get('categoryId') || '',
    merchantId: urlSearchParams.get('merchantId') || '',
  };
}

export const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const topicTransforms: any = (topics: API.Topic[], parent_id: number) => {
  return map(topics, (item) => ({
    ...item,
    title: item?.name,
    key: item?.id,
    value: item?.id,
    pId: parent_id,
    children: topicTransforms(item?.childTopics, item?.id),
    isLeaf: isEmpty(item?.childTopics),
  }));
};

export const categoriesTransforms: any = (categories: API.Category[], parent_id: number) => {
  return map(categories, (item) => ({
    ...item,
    title: item?.name,
    key: item?.id,
    value: item?.id,
    pId: parent_id,
    children: categoriesTransforms(item?.childCategories, item?.id),
    isLeaf: isEmpty(item?.childCategories),
  }));
};

export const topicTransformsTree: any = (
  topics: API.Topic[],
  parent_id: number,
  onChangeTitle: (a: API.Topic) => void,
  onDelete: (a: API.Topic) => void,
  havePermission?: boolean,
) => {
  return map(topics, (item) => ({
    ...item,
    title: (
      <>
        <Paragraph
        // editable={{
        //   icon: <HighlightOutlined />,
        //   tooltip: 'click to edit text',
        //   onChange: (name: string) => onChangeTitle({ name, id: item?.id }),
        //   enterIcon: <CheckOutlined />,
        // }}
        >
          {item?.name}{' '}
          {havePermission && (
            <Popconfirm
              title="Xóa topic"
              description="Bạn có chắc chắn muốn xóa topic này?"
              okText="Đồng ý"
              cancelText="Đóng"
              onCancel={() => {}}
              onConfirm={() => onDelete({ id: item?.id })}
            >
              <DeleteTwoTone twoToneColor="red" />
            </Popconfirm>
          )}
        </Paragraph>
      </>
    ),
    key: item?.id,
    value: item?.id,
    pId: parent_id,
    children: topicTransformsTree(item?.childTopics, item?.id, () => {}, onDelete, havePermission),
    isLeaf: isEmpty(item?.childTopics),
  }));
};

export const categoriesTransformsTree: any = (
  categories: API.Category[],
  parent_id: number,
  onDelete: (a: API.Category) => void,
  havePermission?: boolean,
) => {
  return map(categories, (item) => ({
    ...item,
    title: (
      <Paragraph
        // editable={{
        //   icon: <HighlightOutlined />,
        //   tooltip: 'click to edit text',
        //   onChange: (name: string) => onChangeTitle({ name, id: item?.id }),
        //   enterIcon: <CheckOutlined />,
        // }}
      >
        {item?.name}{' '}
        {havePermission && (
          <Popconfirm
            title="Xóa danh mục"
            description="Bạn có chắc chắn muốn xóa danh mục này?"
            okText="Đồng ý"
            cancelText="Đóng"
            onCancel={() => {}}
            onConfirm={() => onDelete({ id: item?.id })}
          >
            <DeleteTwoTone twoToneColor="red" />
          </Popconfirm>
        )}
      </Paragraph>
    ),
    key: item?.id,
    value: item?.id,
    pId: parent_id,
    children: categoriesTransformsTree(item?.childCategories, item?.id, onDelete, havePermission),
    isLeaf: isEmpty(item?.childCategories),
  }));
};

export const wordCount = (input: string) => {
  // remove tags and backslash characters
  const text = input?.replaceAll(/<(?:.|\s)*?>/g, ' ');
  return compact(text.split(/\s+/)).length;
};

export const getCurrentStepCompleted = (merchantDetail: API.Merchants | undefined) => {
  if (!merchantDetail) return 0;
  // remove tags and backslash characters
  console.log(merchantDetail);

  if (
    !merchantDetail?.logo ||
    !merchantDetail?.phoneNo ||
    !merchantDetail?.storeName ||
    !merchantDetail?.merchantType
  ) {
    return 0;
  } else if (
    !merchantDetail?.taxNumber ||
    !merchantDetail?.address ||
    !merchantDetail?.city ||
    !merchantDetail?.district ||
    !merchantDetail?.ward
  ) {
    return 1;
  } else if (
    !merchantDetail?.identityNumber ||
    !merchantDetail?.identityImageFront ||
    !merchantDetail?.identityImageBack ||
    !merchantDetail?.agreed
  ) {
    return 2;
  }
  return 3;
};

export const slug = (value: string) =>
  slugify(value, {
    replacement: '-', // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: false, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    locale: 'vi', // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
