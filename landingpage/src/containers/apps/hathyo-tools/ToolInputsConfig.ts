import { HealthInputConfig } from "@/types/health-tools";

export const toolInputsConfig: Record<string, HealthInputConfig[]> = {
  // Health
  bfp_calculator: [
    // name
    {
      name: "name",
      label: "Tên của bạn là gì?",
      type: "text",
    },
    // age
    {
      name: "age",
      label: "Bạn bao nhiêu tuổi?",
      type: "number",
      required: true,
      isInteger: true,
      min: 1,
      max: 80,
      errorMessage: "Tuổi nằm trong khoảng 1 - 80 tuổi",
    },
    // gender
    {
      name: "gender",
      label: "Giới tính của bạn là gì?",
      type: "select",
      options: [
        { label: "Nam", value: "male" },
        { label: "Nũ", value: "female" },
      ],
      required: true,
      errorMessage: "Lựa chọn giới tính của bạn",
    },
    // weight
    {
      name: "weight",
      label: "Cân nặng của bạn? (kg)",
      type: "number",
      required: true,
      errorMessage: "Nhập cân nặng của bạn",
    },
    // height
    {
      name: "height",
      label: "Chiều cao của bạn? (cm)",
      type: "number",
      required: true,
      errorMessage: "Nhập chiều cao của bạn",
    },
    // hip
    {
      name: "hipCircumference",
      label: "Số đo hông của bạn? (cm)",
      type: "number",
      errorMessage: "Nhập số đo vòng hông của bạn",
    },
    // neck
    {
      name: "neckCircumference",
      label: "Số đo vòng cổ của bạn? (cm)",
      type: "number",
      errorMessage: "Nhập số đo vòng cổ của bạn",
    },
    // waist
    {
      name: "waistCircumference",
      label: "Số đo vòng eo của bạn? (cm)",
      type: "number",
      errorMessage: "Nhập số đo vòng eo của bạn",
    },
  ],
  bmi_calculator: [
    // name
    {
      name: "name",
      label: "Tên của bạn là gì?",
      type: "text",
    },
    // weight
    {
      name: "weight",
      label: "Cân nặng của bạn? (kg)",
      type: "number",
      required: true,
      errorMessage: "Nhập cân nặng của bạn",
    },
    // height
    {
      name: "height",
      label: "Chiều cao của bạn? (cm)",
      type: "number",
      required: true,
      errorMessage: "Nhập chiều cao của bạn",
    },
  ],
  bmr_calculator: [
    // name
    {
      name: "name",
      label: "Tên của bạn là gì?",
      type: "text",
    },
    // age
    {
      name: "age",
      label: "Bạn bao nhiêu tuổi?",
      type: "number",
      required: true,
      isInteger: true,
      min: 1,
      max: 80,
      errorMessage: "Tuổi nằm trong khoảng 1 - 80 tuổi",
    },
    // gender
    {
      name: "gender",
      label: "Giới tính của bạn là gì?",
      type: "select",
      options: [
        { label: "Nam", value: "male" },
        { label: "Nũ", value: "female" },
      ],
      required: true,
      errorMessage: "Lựa chọn giới tính của bạn",
    },
    // weight
    {
      name: "weight",
      label: "Cân nặng của bạn? (kg)",
      type: "number",
      required: true,
      errorMessage: "Nhập cân nặng của bạn",
    },
    // height
    {
      name: "height",
      label: "Chiều cao của bạn? (cm)",
      type: "number",
      required: true,
      errorMessage: "Nhập chiều cao của bạn",
    },
    // bmr_formula
    {
      name: "bmr_formula",
      label: "Công thức ước tính BMR",
      type: "select",
      options: [
        { label: "Mifflin-St Jeor", value: "mifflin_st_jeor" },
        { label: "Revised Harris-Benedict", value: "revised_harris_benedict" },
        { label: "Katch-McArdle", value: "katch_mc_ardle" },
      ],
      required: true,
      defaultValue: "katch_mc_ardle",
    },
  ],
  tdee_calculator: [
    // name
    {
      name: "name",
      label: "Tên của bạn là gì?",
      type: "text",
    },
    // age
    {
      name: "age",
      label: "Bạn bao nhiêu tuổi?",
      type: "number",
      required: true,
      isInteger: true,
      min: 1,
      max: 80,
      errorMessage: "Tuổi nằm trong khoảng 1 - 80 tuổi",
    },
    // gender
    {
      name: "gender",
      label: "Giới tính của bạn là gì?",
      type: "select",
      options: [
        { label: "Nam", value: "male" },
        { label: "Nũ", value: "female" },
      ],
      required: true,
      errorMessage: "Lựa chọn giới tính của bạn",
    },
    // weight
    {
      name: "weight",
      label: "Cân nặng của bạn? (kg)",
      type: "number",
      required: true,
      errorMessage: "Nhập cân nặng của bạn",
    },
    // height
    {
      name: "height",
      label: "Chiều cao của bạn? (cm)",
      type: "number",
      required: true,
      errorMessage: "Nhập chiều cao của bạn",
    },
    // activities
    {
      name: "activityLevel",
      label: "Mức độ vận động",
      type: "select",
      options: [
        {
          label: "Ít vận động (Hầu như không tập thể dục)-St Jeor",
          value: 1.2,
        },
        {
          label: "Hoạt động nhẹ (Tập thể dục nhẹ 1–3 ngày/tuần)",
          value: 1.375,
        },
        {
          label: "Hoạt động vừa phải (Tập thể dục vừa phải 3–5 ngày/tuần)",
          value: 1.55,
        },
        {
          label: "Hoạt động cao (Tập thể dục cường độ cao 6–7 ngày/tuần)",
          value: 1.725,
        },
        {
          label:
            "Hoạt động rất cao (Tập thể dục rất nặng hoặc làm công việc lao động)",
          value: 1.9,
        },
      ],
      required: true,
      errorMessage: "Lựa chọn mức độ vận động của bạn",
    },
    // bmr_formula
    {
      name: "bmr_formula",
      label: "Công thức ước tính BMR",
      type: "select",
      options: [
        { label: "Mifflin-St Jeor", value: "mifflin_st_jeor" },
        { label: "Revised Harris-Benedict", value: "revised_harris_benedict" },
        { label: "Katch-McArdle", value: "katch_mc_ardle" },
      ],
      required: true,
      defaultValue: "katch_mc_ardle",
    },
  ],
  calories_calculator: [
    // name
    {
      name: "name",
      label: "Tên của bạn là gì?",
      type: "text",
    },
    // age
    {
      name: "age",
      label: "Bạn bao nhiêu tuổi?",
      type: "number",
      required: true,
      isInteger: true,
      min: 1,
      max: 80,
      errorMessage: "Tuổi nằm trong khoảng 1 - 80 tuổi",
    },
    // gender
    {
      name: "gender",
      label: "Giới tính của bạn là gì?",
      type: "select",
      options: [
        { label: "Nam", value: "male" },
        { label: "Nũ", value: "female" },
      ],
      required: true,
      errorMessage: "Lựa chọn giới tính của bạn",
    },
    // weight
    {
      name: "weight",
      label: "Cân nặng của bạn? (kg)",
      type: "number",
      required: true,
      errorMessage: "Nhập cân nặng của bạn",
    },
    // height
    {
      name: "height",
      label: "Chiều cao của bạn? (cm)",
      type: "number",
      required: true,
      errorMessage: "Nhập chiều cao của bạn",
    },
    // activities
    {
      name: "activityLevel",
      label: "Mức độ vận động",
      type: "select",
      options: [
        {
          label: "Ít vận động (Hầu như không tập thể dục)-St Jeor",
          value: 1.2,
        },
        {
          label: "Hoạt động nhẹ (Tập thể dục nhẹ 1–3 ngày/tuần)",
          value: 1.375,
        },
        {
          label: "Hoạt động vừa phải (Tập thể dục vừa phải 3–5 ngày/tuần)",
          value: 1.55,
        },
        {
          label: "Hoạt động cao (Tập thể dục cường độ cao 6–7 ngày/tuần)",
          value: 1.725,
        },
        {
          label:
            "Hoạt động rất cao (Tập thể dục rất nặng hoặc làm công việc lao động)",
          value: 1.9,
        },
      ],
      required: true,
      errorMessage: "Lựa chọn mức độ vận động của bạn",
    },
    // bmr_formula
    {
      name: "bmr_formula",
      label: "Công thức ước tính BMR",
      type: "select",
      options: [
        { label: "Mifflin-St Jeor", value: "mifflin_st_jeor" },
        { label: "Revised Harris-Benedict", value: "revised_harris_benedict" },
        { label: "Katch-McArdle", value: "katch_mc_ardle" },
      ],
      required: true,
      defaultValue: "katch_mc_ardle",
    },
  ],
  calories_burn_calculator: [
    // name
    {
      name: "name",
      label: "Tên của bạn là gì?",
      type: "text",
    },
    // met
    {
      name: "met",
      label: "Loại hình vận động",
      type: "select",
      options: [
        {
          label: "Nghỉ ngơi (Resting - Không hoạt động)",
          value: 1,
        },
        {
          label: "Đi bộ nhẹ nhàng (Light walking)",
          value: 3.5,
        },
        {
          label: "Chạy cường độ cao (High-intensity running)",
          value: 9.8,
        },
        {
          label: "Làm việc nhà nhẹ (Light household activities)",
          value: 4.0,
        },
        {
          label: "Đạp xe nhanh (Fast cycling)",
          value: 8.0,
        },
        {
          label: "Tập yoga hoặc vận động nhẹ (Yoga or light exercise)",
          value: 3.0,
        },
        {
          label: "Bơi lội vừa phải (Moderate swimming)",
          value: 6.0,
        },
      ],
      required: true,
      errorMessage: "Lựa chọn mức độ vận động của bạn",
    },
    // duration
    {
      name: "duration",
      label: "Thời gian luyện tập (phút)",
      type: "number",
      required: true,
      isInteger: true,
      defaultValue: 45,
      errorMessage: "Nhập thời gian luyện tập của bạn",
    },
    // weight
    {
      name: "weight",
      label: "Cân nặng của bạn? (kg)",
      type: "number",
      required: true,
      errorMessage: "Nhập cân nặng của bạn",
    },
  ],
  health_weight_calculator: [
    // name
    {
      name: "name",
      label: "Tên của bạn là gì?",
      type: "text",
    },
    // height
    {
      name: "height",
      label: "Chiều cao của bạn? (cm)",
      type: "number",
      required: true,
      errorMessage: "Nhập chiều cao của bạn",
    },
  ],
  ibw_calculator: [
    // name
    {
      name: "name",
      label: "Tên của bạn là gì?",
      type: "text",
    },
    // age
    {
      name: "age",
      label: "Bạn bao nhiêu tuổi?",
      type: "number",
      required: true,
      isInteger: true,
      min: 1,
      max: 80,
      errorMessage: "Tuổi nằm trong khoảng 1 - 80 tuổi",
    },
    // gender
    {
      name: "gender",
      label: "Giới tính của bạn là gì?",
      type: "select",
      options: [
        { label: "Nam", value: "male" },
        { label: "Nũ", value: "female" },
      ],
      required: true,
      errorMessage: "Lựa chọn giới tính của bạn",
    },
    // height
    {
      name: "height",
      label: "Chiều cao của bạn? (cm)",
      type: "number",
      required: true,
      errorMessage: "Nhập chiều cao của bạn",
    },
  ],
  lbm_calculator: [
    // name
    {
      name: "name",
      label: "Tên của bạn là gì?",
      type: "text",
    },
    // gender
    {
      name: "gender",
      label: "Giới tính của bạn là gì?",
      type: "select",
      options: [
        { label: "Nam", value: "male" },
        { label: "Nũ", value: "female" },
      ],
      required: true,
      errorMessage: "Lựa chọn giới tính của bạn",
    },
    // height
    {
      name: "height",
      label: "Chiều cao của bạn? (cm)",
      type: "number",
      required: true,
      errorMessage: "Nhập chiều cao của bạn",
    },
    // weight
    {
      name: "weight",
      label: "Cân nặng của bạn? (kg)",
      type: "number",
      required: true,
      errorMessage: "Nhập cân nặng của bạn",
    },
  ],
  pace_calculator: [
    // name
    {
      name: "name",
      label: "Tên của bạn là gì?",
      type: "text",
    },
    // time
    {
      name: "time",
      label: "Khoảng cách (km)",
      type: "time",
      required: true,
      errorMessage: "Nhập thời gian chạy",
    },
    // distance
    {
      name: "distance",
      label: "Khoảng cách (km)",
      type: "number",
      required: true,
      errorMessage: "Nhập độ dài đường chạy",
    },
  ],
  rm_calculator: [
    // name
    {
      name: "name",
      label: "Tên của bạn là gì?",
      type: "text",
    },
    // weight
    {
      name: "weight",
      label: "Cân nặng của bạn? (kg)",
      type: "number",
      required: true,
      errorMessage: "Nhập cân nặng của bạn",
    },
    // reps
    {
      name: "reps",
      label: "Lặp lại (lần)",
      type: "number",
      required: true,
      isInteger: true,
      min: 1,
      max: 10,
      errorMessage: "Nhập cân nặng của bạn",
    },
  ],

  // Other
  //   bac_calculator: [
  //     // name
  //     {
  //       name: "name",
  //       label: "Tên của bạn là gì?",
  //       type: "text",
  //     },
  //   ],
  //   bsa_calculator: [
  //     // name
  //     {
  //       name: "name",
  //       label: "Tên của bạn là gì?",
  //       type: "text",
  //     },
  //   ],
  //   carbonHydrate_calculator: [
  //     // name
  //     {
  //       name: "name",
  //       label: "Tên của bạn là gì?",
  //       type: "text",
  //     },
  //   ],
  //   fat_intake_calculator: [
  //     // name
  //     {
  //       name: "name",
  //       label: "Tên của bạn là gì?",
  //       type: "text",
  //     },
  //   ],
  //   gfr_calculator: [
  //     // name
  //     {
  //       name: "name",
  //       label: "Tên của bạn là gì?",
  //       type: "text",
  //     },
  //   ],
  //   macro_calculator: [
  //     // name
  //     {
  //       name: "name",
  //       label: "Tên của bạn là gì?",
  //       type: "text",
  //     },
  //   ],
  //   protein_calculator: [
  //     // name
  //     {
  //       name: "name",
  //       label: "Tên của bạn là gì?",
  //       type: "text",
  //     },
  //   ],
  //   whr_calculator: [
  //     // name
  //     {
  //       name: "name",
  //       label: "Tên của bạn là gì?",
  //       type: "text",
  //     },
  //   ],
};
