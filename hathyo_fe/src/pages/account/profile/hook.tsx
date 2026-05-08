import { useModel, useRequest } from '@umijs/max';
import type { UploadFile } from 'antd';
import { Form, message } from 'antd';
import { useEffect, useState } from 'react';

import type { UserFormData } from '@/services/users/api';
import { getProfile, updateProfile } from '@/services/users/api';

export const useDetail = () => {
  const [form] = Form.useForm<UserFormData>();
  const [current, setCurrent] = useState(0);

  const { setInitialState } = useModel('@@initialState');
  // Fetch user profile
  const { loading: getting, refresh, data: userDetail } = useRequest(getProfile);

  // Handle profile update
  const { loading: updating, run: updateUserProfile } = useRequest(updateProfile, {
    manual: true,
    onSuccess: async () => {
      message.success('Cập nhật thông tin người dùng thành công');
      refresh();

      const updated = await getProfile();

      if (updated.data.avatar) {
        localStorage.setItem('avatar', updated.data.avatar);
      }

      setInitialState((prev) => ({
        ...prev,
        currentUser: {
          ...updated.data,
          avatar: updated.data.avatar ?? '',
          authorities: prev?.currentUser?.authorities ?? [],
          fullName: `${updated.data.firstname} ${updated.data.lastname}`,
        },
      }));
    },
    onError: (error) => {
      console.error('Update failed:', error);
      message.error('Lỗi khi cập nhật thông tin người dùng');
    },
  });

  // Form submit
  const onFinish = (values: UserFormData) => {
    if (!userDetail?.id) {
      message.error('Không thể cập nhật vì chưa có thông tin người dùng');
      return;
    }

    const mergedData: UserFormData = {
      ...userDetail,
      ...values,
      id: userDetail.id,
      fileUpload: values.fileUpload,
      identityImageBackTempt: values.identityImageBackTempt,
      identityImageFrontTempt: values.identityImageFrontTempt,
      businessLicenseTempt: values.businessLicenseTempt,
    };

    updateUserProfile(mergedData);
  };

  // Prefill form with fetched user data
  useEffect(() => {
    if (userDetail) {
      // Nếu đã có avatar sẵn, chuyển thành UploadFile[] để hiển thị trước
      const initialFiles: UploadFile[] = userDetail.avatar
        ? [
            {
              uid: '-1',
              name: 'avatar',
              status: 'done',
              url: userDetail.avatar,
            },
          ]
        : [];
      form.setFieldsValue({
        ...userDetail,
        fileUpload: initialFiles,
      });
    }
  }, [userDetail, form]);

  return {
    userDetail,
    form,
    loading: getting || updating,
    current,
    setCurrent,
    onFinish,
  };
};
