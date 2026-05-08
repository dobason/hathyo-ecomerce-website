"use client";
import React from "react";
import Button from "@/components/Button";
import { UserInfo } from "@/types/health-tools";
import { toolInputsConfig } from "../ToolInputsConfig";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface Props {
  toolSelected: keyof typeof toolInputsConfig;
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
  setUserData: React.Dispatch<React.SetStateAction<UserInfo | null>>;
  setToolSelected: React.Dispatch<
    React.SetStateAction<keyof typeof toolInputsConfig | null>
  >;
}

function InputForm({
  toolSelected,
  setShowResult,
  setUserData,
  setToolSelected,
}: Props) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserInfo>({
    defaultValues: {
      bmr_formula: "katch_mc_ardle",
      bfp_formula: "bmi",
      time_run: "00:50:25",
      distance_run: 5,
      repeat_in_rep_max: 1,
      activityLevel: 1.2,
      met: 1,
      duration: 1,
      drinks: [
        {
          type: "Beer",
          amount: 2,
          size: "12oz/330ml bar cup (small)",
          abv: 5,
        },
      ],
    },
  });

  const inputs = toolInputsConfig[toolSelected];
  const selectedBmrFormula = watch("bmr_formula");

  const onSubmit: SubmitHandler<UserInfo> = async (data) => {
    setUserData(data);
    setShowResult(true);
  };

  // return null;
  return (
    <div className="container py-14">
      <div className="flex flex-col">
        <div className="mb-10">
          <div className="text-4xl font-bold text-white text-center mb-5">
            Thông tin sức khỏe của bạn
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inputs?.map((input) => (
              <div key={input.name}>
                <label
                  htmlFor={input.name}
                  className="body-semibold text-white"
                >
                  {input.label}
                </label>
                {input.type === "select" ? (
                  <Controller
                    name={input.name as keyof UserInfo}
                    control={control}
                    rules={{
                      required: input.required && "Bạn phải nhập thông tin này",
                    }}
                    render={({ field }) => (
                      <select
                        {...field}
                        id={input.name}
                        className="mt-1 block w-full focus:ring-green-100 px-3 py-2 border border-gray-300 rounded-lg bg-white text-md focus:outline-none focus:bg-Moss/100"
                      >
                        <option value="">Lựa chọn...</option>
                        {input.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                ) : input.type === "time" ? (
                  <Controller
                    name={input.name as keyof UserInfo}
                    control={control}
                    rules={{
                      required: input.required && "Bạn phải nhập thông tin này",
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        id={input.name}
                        type={input.type}
                        step="1"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-md focus:outline-none focus:bg-Moss/100 "
                      />
                    )}
                  />
                ) : (
                  <Controller
                    name={input.name as keyof UserInfo}
                    control={control}
                    rules={{
                      required: input.required && "Bạn phải nhập thông tin này",
                      min: input.min
                        ? {
                            value: input.min,
                            message: `Giá trị phải lớn hơn hoặc bằng ${input.min}`,
                          }
                        : undefined,
                      max: input.max
                        ? {
                            value: input.max,
                            message: `Giá trị phải bé hơn hoặc bằng ${input.max}`,
                          }
                        : undefined,
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        id={input.name}
                        type={input.type}
                        placeholder={input.label}
                        min={input.min}
                        max={input.max}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-md focus:outline-none focus:bg-Moss/100 "
                      />
                    )}
                  />
                )}
                {errors[input.name as keyof UserInfo] && (
                  <p style={{ color: "red", marginTop: "0.5rem" }}>
                    {input.errorMessage}
                  </p>
                )}
              </div>
            ))}
            {selectedBmrFormula === "katch_mc_ardle" &&
              [
                "tdee_calculator",
                "bmr_calculator",
                "calories_calculator",
              ].includes(toolSelected) && (
                <div style={{ marginBottom: "1rem" }}>
                  <label
                    htmlFor="body_fat"
                    className="body-semibold text-white"
                  >
                    Body Fat (%)
                  </label>
                  <Controller
                    name="body_fat"
                    control={control}
                    defaultValue={20}
                    rules={{
                      required:
                        "Công thức Katch-McArdle cần bạn nhập chỉ số BFP (Body Fat)",
                      min: {
                        value: 1,
                        message: "Chỉ số BFP phải lớn hơn bằng 1%",
                      },
                      max: {
                        value: 100,
                        message: "Chỉ số BFP phải không lớn hơn bằng 100%",
                      },
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        id="body_fat"
                        type="number"
                        placeholder="Nhập chỉ số BFP (%)"
                        min={1}
                        max={100}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-md focus:outline-none focus:bg-Moss/100 "
                      />
                    )}
                  />
                  {errors.body_fat && (
                    <p style={{ color: "red", marginTop: "0.5rem" }}>
                      Công thức Katch-McArdle cần bạn nhập chỉ số BFP (Body Fat)
                    </p>
                  )}
                </div>
              )}
          </div>
          <div className="mt-20 flex justify-center gap-4">
            <div className="flex justify-center">
              <Button type="secondary" htmlType="submit">
                Tiếp tục
              </Button>
            </div>
            <div className="flex justify-center">
              <Button
                type="secondary"
                onClick={() => {
                  setShowResult(false);
                  setToolSelected(null);
                }}
              >
                Trở lại
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InputForm;
