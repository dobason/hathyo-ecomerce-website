import { useState, ChangeEvent } from "react";
import Image from "next/image";
import Upload from "@/components/Icons/Upload";
import Button from "@/components/Button";
import User from "@/components/Icons/User";
import { uploadService } from "@/services/client/upload";
import { get, isEmpty, omit } from "lodash";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

type AvatarUploadProps = {
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
};

const AvatarUpload = ({ setValue, watch }: AvatarUploadProps) => {
  const image = watch("avatar"); // Watch the avatar field
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (Max: 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Dung lượng file vượt quá 5MB.");
      return;
    }

    // Show preview
    const fileURL = URL.createObjectURL(file);

    // Upload to API
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await uploadService({
        method: "POST",
        body: formData,
      });
      if (isEmpty(response?.links)) {
        throw new Error("Có lỗi xảy ra trong quá trình upload");
      }
      setValue("avatar", response.links?.permalink);
    } catch (error) {
      console.error("Lỗi upload:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {image ? (
        <div className="py-4 flex flex-row justify-start items-center gap-4 xl:gap-8 border border-dashed border-white border-b-gray-300">
          <Image
            src={image}
            alt="Avatar"
            width={128}
            height={128}
            className="w-32 h-32 rounded-full object-cover"
          />
          <div className="flex flex-col items-start justify-start gap-2">
            <Button type="primary" onClick={() => setValue("avatar", "")}>
              <div className="flex flex-row justify-center gap-2">
                <Upload />
                <div className="text-md">Chọn ảnh</div>
              </div>
            </Button>
            <div className="text-xs text-gray-600 font-normal">
              Định dạng file JPEG, PNG. Dung lượng file tối đa 5MB.
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center w-full"
          >
            <div className="w-full py-4 flex flex-row justify-start items-center gap-4 xl:gap-8 border border-dashed border-white border-b-gray-300">
              <User className="w-32 h-32" fillColor="#D1D1D6" />
              <div className="flex flex-col items-start justify-start gap-2">
                <div className="cursor-pointer shadow-Shadow/xs bg-Moss/400 text-white border-Moss/400 hover:bg-Moss/600 hover:border-Moss/600 flex flex-row text-base items-center py-3 px-12 rounded-lg">
                  <div className="flex flex-row justify-center gap-2">
                    <Upload />
                    <div className="text-md">Chọn ảnh</div>
                  </div>
                </div>
                <div className="text-xs text-gray-600 font-normal">
                  Định dạng file JPEG, PNG. Dung lượng file tối đa 5MB.
                </div>
              </div>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default AvatarUpload;
