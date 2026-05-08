import { history } from '@umijs/max';
import { Form, message } from 'antd';

import { useCreateProductServices } from '@/services/products/services';

export const useCreate = () => {
  const [form] = Form.useForm();

  const onSuccess = () => {
    message.success('Tạo sản phẩm thành công');
    history.replace('/products');
  };

  const onError = (e: Error) => {
    console.log(e);
    message.error('Lỗi tạo bài viết');
  };

  const { loading, run } = useCreateProductServices({ onSuccess, onError });

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

  const onFinish = async () => {
    const values = await form.validateFields();
    let body = { ...values };
    if (body.variants && body?.variants?.length > 0) {
      const minimumPrice = findMinPrice(body.variants);
      body.price = minimumPrice?.price;
      body.anchoPrice = minimumPrice?.anchoPrice;
      body.mainAttribute = values?.attributes?.[0] || null;
      body.secondAttribute = values?.attributes?.[1] || null;
      body.productVariants = values?.variants;
    }
    delete body.attributes;
    delete body.variants;

    if (!values?.mainImageUrl) {
      message.error('Vui lòng upload ảnh chính của sản phẩm!');
      return;
    }

    run({ ...body });
  };

  return {
    form,
    loading,
    onFinish,
  };
};
