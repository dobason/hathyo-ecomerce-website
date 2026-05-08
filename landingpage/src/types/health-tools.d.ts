export type Gender = "male" | "female";

export type Race = "black" | "non-black";

export type ActivityLevel = 1.2 | 1.375 | 1.55 | 1.725 | 1.9;

export type MET = 1 | 3.5 | 9.8 | 4.0 | 8.0 | 3.0 | 6.0;

export type RepeatedInRepMax = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type PaceUnit = "min/km" | "min/mile" | "km/h" | "mile/h";

export type PointsPage = PointPage[];

export type DietType = "Balanced" | "Low Fat" | "Low Carbs" | "High Protein";

export type DrinkType = "Beer" | "Wine" | "Liquor" | "Other";

export type HealthInputConfig =
  | {
      name: string;
      label: string;
      type: "text" | "number" | "time";
      required?: boolean;
      min?: number;
      max?: number;
      isInteger?: boolean;
      errorMessage?: string;
      defaultValue?: string | number | undefined;
    }
  | {
      name: string;
      label: string;
      type: "select";
      options: { label: string; value: string | number }[];
      required?: boolean;
      errorMessage?: string;
      defaultValue?: string | number | undefined;
    };

export type MacroGoal =
  | "maintain weight"
  | "mild weight loss (0.25kg/week)"
  | "weight loss (0.5kg/week)"
  | "extreme weight loss (1kg/week)"
  | "mild weight gain (0.25kg/week)"
  | "weight gain (0.5kg/week)"
  | "extreme weight gain (1kg/week)";

export type DrinkSize =
  | "250ml bottle"
  | "12oz/330ml bottle"
  | "16oz/500ml bottle"
  | "250ml bar cup"
  | "12oz/330ml bar cup (small)"
  | "16oz/500ml bar cup"
  | "20oz/600ml bar cup (tall)"
  | "12oz/330ml can"
  | "16oz/500ml can"
  | "20oz/600ml can"
  | "1 liter";

export type ActivityLevelText =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very active"
  | "muscle gain"
  | "weight loss";

export type BFPFormular = "us_navy" | "bmi";

export type BMRFormular =
  | "mifflin_st_jeor"
  | "revised_harris_benedict"
  | "katch_mc_ardle";

export type TDEEFormula =
  | "g_j_hamwi"
  | "b_j_devine"
  | "j_d_robinson"
  | "d_r_miller";

export interface UserInfo {
  name?: string;
  met?: MET;
  race: Race;
  age: number;
  gender: Gender;
  weight: number;
  height: number;
  duration?: number;
  hipCircumference?: number;
  neckCircumference?: number;
  waistCircumference?: number;
  activityLevel?: ActivityLevel;
  hipSize?: number;
  bustSize?: number;
  time_run?: string;
  waistSize?: number;
  creatinine?: number;
  highHipSize?: number;
  distance_run?: number;
  goal_macro?: MacroGoalnumber;
  repeat_in_rep_max?: RepeatedInRepMaxnumber;
  activityLevelText?: ActivityLevelText;
  bmr_formula?: BMRFormular;
  body_fat?: number;
  bfp_formula?: BFPFormular;
  points_break_in_race?: PointsPage;
  time_run?: string;
  from_unit_pace?: PaceUnit;
  to_unit_pace?: PaceUnit;
  drinks?: Drink[];
  timeSinceFirstDrink?: number;
}

export interface PointPage {
  time: string;
  distance: number;
}

export interface Drink {
  type: DrinkType;
  amount: number;
  size: DrinkSize;
  abv: number;
}

export interface ToolResult {
  user_infor: UserInfo;
  bfp_result?: {
    us_navy: number;
    bmi: number;
    fatMass: number;
    leanMass: number;
    category: string;
  };
  bmi_result?: {
    bmi: number;
    bmi_category: string;
    pi: number;
    bmi_prime: number;
  };
  rm_result?: {
    epley: number;
    brzycki: number;
    lombardi: number;
  };
  ibw_result?: {
    g_j_hamwi: number;
    b_j_devine: number;
    j_d_robinson: number;
    d_r_miller: number;
  };
  lbm_result?: {
    eLBM_boer: number;
    eLBM_hume: number;
    eLBM_james: number;
    eLBM_children: number;
  };
  bmr_result?: {
    mifflin_st_jeor: number;
    revised_harris_benedict: number;
    katch_mc_ardle: number;
  };
  calories_result?: {};
  tdee_result?: number;
  calories_burn_result?: number;
  health_weight_result?: {
    minWeight: number;
    maxWeight: number;
  };
  pace_result?: {};
  bac_result?: {
    bac: number;
    details: Record<string, number>;
  };
  bsa_result?: Record<string, number>;
  carbonhydrate_result?: {};
  fat_intake_result?: {
    goal: Goal;
    dailyCalories: number;
    dailyFat: {
      min: number;
      max: number;
    };
    saturatedFat: {
      max10: number;
      max7: number;
    };
  }[];
  gfr_result?: {
    adult: number | null;
    children: number | null;
  };
  macro_result?: {};
  protein_result?: {
    proteinMin: number;
    proteinMax: number;
    proteinCalories: {
      min: number;
      max: number;
    };
  };
  whr_result?: {
    whr: number;
    bwr: number;
    hhr: number;
    category: {
      whr: number;
      bwr: number;
      hhr: number;
      category: string;
    };
  };
}
