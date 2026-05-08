import { useParams, useRequest } from '@umijs/max';
import { Form, message } from 'antd';
import { get, isEmpty, omit } from 'lodash';
import { useEffect } from 'react';

import { deleteProduct, detailProduct } from '@/services/products/api';
import { usePatchProductServices } from '@/services/products/services';

export const useDetail = () => {
  const [form] = Form.useForm();
  const { id = '' } = useParams();

  const {
    loading: getting,
    refresh,
    data: productDetail,
  } = useRequest(() => detailProduct({ id }));

  const onSuccess = () => {
    message.success('Cập nhật sản phẩm thành công');
    refresh();
  };

  const onError = (e: Error) => {
    console.log(e);
    message.error('Lỗi khi sửa sản phẩm');
  };

  const { loading, run: onPatch } = usePatchProductServices({ onSuccess, onError });

  function findMinPrice(variants: API.Variant[]): API.MinPriceProps {
    if (variants.length === 0) return { anchoPrice: 0, price: 0 }; // Return 0 or throw an error if the array is empty

    let minPrice = variants[0].price; // Start with the price of the first variant
    let minAncho = variants[0].anchoPrice;
    variants.forEach((variant) => {
      if (variant.price < minPrice) {
        minPrice = variant.price; // Update minPrice if a lower price is found
        minAncho = variant.anchoPrice;
      }
    });

    return { anchoPrice: minAncho, price: minPrice };
  }

  const onFinish = (values: API.Product) => {
    if (!productDetail?.mainImageUrl && !values?.mainImageUrl) {
      message.error('Vui lòng upload ảnh thumbnail!');
      return;
    }

    //Mapping values
    let body = { ...values, id: productDetail?.id };
    if (body.variants && body?.variants?.length > 0) {
      const minimumPrice = findMinPrice(body.variants);
      body.price = minimumPrice?.price;
      body.anchoPrice = minimumPrice?.anchoPrice;
      body.mainAttribute = values?.attributes?.[0];
      body.secondAttribute = values?.attributes?.[1];
      body.productVariants = values?.variants;
    }
    delete body.attributes;
    delete body.variants;

    onPatch(body);
  };

  const onDeleteSuccess = () => {
    refresh();
    message.success('Xóa sản phẩm thành công');
  };

  // const onPatchSuccess = () => {
  //   refresh();
  //   message.success('Cập nhật sản phẩm thành công');
  // };

  const { loading: deleting, run: onDelete } = useRequest((id) => deleteProduct({ id }), {
    manual: true,
    onSuccess: onDeleteSuccess,
  });

  // const { loading: updating, run: handlePatchStatus } = useRequest(
  //   ({ id, status }) => patchStatus({ id, status, note: '' }),
  //   {
  //     manual: true,
  //     onSuccess: onPatchSuccess,
  //   },
  // );

  useEffect(() => {
    if (!isEmpty(productDetail)) {
      let attributes = [];
      if (!!productDetail?.mainAttribute) {
        let mainAttribute = {
          id: productDetail?.mainAttribute?.id,
          name: productDetail?.mainAttribute?.name,
          attributeValues: productDetail?.mainAttribute?.attributeValues?.map((item) => ({
            id: item.id,
            value: item.value,
          })),
        };
        attributes.push(mainAttribute);
      }
      if (!!productDetail?.secondAttribute) {
        let secondAttribute = {
          id: productDetail?.secondAttribute?.id,
          name: productDetail?.secondAttribute?.name,
          attributeValues: productDetail?.secondAttribute?.attributeValues?.map((item) => ({
            id: item.id,
            value: item.value,
          })),
        };
        attributes.push(secondAttribute);
      }
      form.setFieldsValue({
        ...omit(productDetail, 'mainImageUrl'),
        parentId: get(productDetail, 'shopCategory.id'),
        attributes: attributes,
        variants: productDetail?.variants,
      });
    }
  }, [productDetail]);

  return {
    productDetail,
    form,
    loading: loading || getting || deleting,
    onFinish,
    handleDelete: onDelete,
    // handlePatchStatus,
  };
};
