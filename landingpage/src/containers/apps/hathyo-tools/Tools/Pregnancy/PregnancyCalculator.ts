export class PregnancyCalculator {
  date_input: Date;
  gestationalAgeWeeks?: number; // Sử dụng cho Ultrasound
  cycleLength?: number; // Sử dụng cho LMP
  conceptionDate?: Date; // Sử dụng cho Conception
  embryoAge?: number; // Sử dụng cho IVF
  dueDate?: number; // Sử dụng cho Due Date

  constructor(
    date_input: Date,
    cycleLength: number,
    gestationalAgeWeeks: number,
    conceptionDate: Date,
    embryoAge: number,
    dueDate: number
  ) {
    this.date_input = date_input;
    this.cycleLength = cycleLength;
    this.gestationalAgeWeeks = gestationalAgeWeeks;
    this.conceptionDate = conceptionDate;
    this.embryoAge = embryoAge;
    this.dueDate = dueDate;
  }

  public calculateFromUltrasound() {
    const totalGestationDays = 280; // 40 tuần = 280 ngày
    const gestationalAgeDays = this.gestationalAgeWeeks! * 7; // Tuổi thai tính bằng ngày

    const dueDate = new Date(this.date_input); // Ngày siêu âm
    dueDate.setDate(
      this.date_input.getDate() + (totalGestationDays - gestationalAgeDays)
    );
    return dueDate;
  }

  public calculateFromLMP(): Date {
    const standardGestationDays = 280;
    const cycleAdjustment = this.cycleLength! - 28;
    const dueDate = new Date(this.date_input);
    dueDate.setDate(
      this.date_input.getDate() + standardGestationDays + cycleAdjustment
    );
    return dueDate;
  }

  public calculateDueDateFromConception(): Date {
    const gestationFromConception = 266; // 38 tuần
    const dueDate = new Date(this.date_input);
    dueDate.setDate(this.date_input.getDate() + gestationFromConception);
    return dueDate;
  }

  public calculateDueDateFromIVF(): Date {
    const gestationFromTransfer = 266; // 38 tuần
    const dueDate = new Date(this.date_input);
    dueDate.setDate(
      this.date_input.getDate() + this.embryoAge! + gestationFromTransfer
    );
    return dueDate;
  }

  public calculateLMPFromDueDate(): Date {
    const standardGestationDays = 280;
    const lmp = new Date(this.date_input);
    lmp.setDate(this.date_input.getDate() - standardGestationDays);
    return lmp;
  }

  public calculateAllMethod() {
    return {
      lmp: this.calculateFromLMP(),
      ivf: this.calculateDueDateFromIVF(),
      due_date: this.calculateLMPFromDueDate(),
      ultra_sound: this.calculateFromUltrasound(),
      conception: this.calculateDueDateFromConception(),
    };
  }
}
