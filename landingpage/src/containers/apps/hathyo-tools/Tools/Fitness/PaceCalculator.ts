import { PointsPage, PaceUnit } from "@/types/health-tools";

export class PaceCalculator {
  private time: string;
  private distance: number;

  constructor(time: string, distance: number) {
    this.time = time;
    this.distance = distance;
  }

  private _timeToMinutes(time: string): number {
    const timeParts = time.split(":");
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);

    return hours * 60 + minutes + seconds / 60;
  }

  private _minutesToTime(minutes: number): string {
    const totalSeconds = Math.round(minutes * 60);
    const hours = Math.floor(totalSeconds / 3600);
    const remainingSeconds = totalSeconds % 3600;
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;

    if (hours > 0) {
      // Nếu có giờ, định dạng hh:mm:ss
      return `${hours.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    } else {
      // Nếu không có giờ, định dạng mm:ss
      return `${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
  }

  public calculatePage(): string {
    const pace = this._timeToMinutes(this.time) / this.distance;
    const paceMinutes = Math.floor(pace);
    const paceSeconds = Math.round((pace - paceMinutes) * 60);

    const formattedPace = `${paceMinutes}: ${paceSeconds
      .toString()
      .padStart(2, "0")}`;

    return formattedPace;
  }

  public predictionRace(): {
    distance: number;
    predictedTime: string;
  }[] {
    const pace = this._timeToMinutes(this.time) / this.distance;
    const raceDistances = [5, 10, 21.097, 42.195];

    const predictions = raceDistances.map((raceDistance) => {
      const estimatedTimeMinutes = raceDistance * pace;
      const estimatedHours = Math.floor(estimatedTimeMinutes / 60);
      const estimatedMinutes = Math.floor(estimatedTimeMinutes % 60);
      const estimatedSeconds = Math.round((estimatedTimeMinutes % 1) * 60);

      return {
        distance: raceDistance,
        predictedTime: `${estimatedHours} giờ ${estimatedMinutes
          .toString()
          .padStart(2, "0")} phút ${estimatedSeconds
          .toString()
          .padStart(2, "0")} giây`,
      };
    });

    return predictions;
  }

  public multiPointPaceCalculator(points: PointsPage): {
    segmentPaces: { segment: string; pace: string }[];
    averagePace: string;
  } {
    const results: { segment: string; pace: string }[] = [];
    let totalDistance = 0;
    let totalTime = 0;

    for (let i = 1; i < points.length; i++) {
      const prevPoint = points[i - 1];
      const currentPoint = points[i];

      const timePartsPrev = prevPoint.time.split(":").map(Number);
      const timePartsCurrent = currentPoint.time.split(":").map(Number);

      const timePrev =
        timePartsPrev[0] * 60 + timePartsPrev[1] + timePartsPrev[2] / 60;
      const timeCurrent =
        timePartsCurrent[0] * 60 +
        timePartsCurrent[1] +
        timePartsCurrent[2] / 60;

      const segmentTime = timeCurrent - timePrev;
      const segmentDistance = currentPoint.distance - prevPoint.distance;

      totalDistance += segmentDistance;
      totalTime += segmentTime;

      const pace = segmentTime / segmentDistance;
      const paceMinutes = Math.floor(pace);
      const paceSeconds = Math.round((pace - paceMinutes) * 60);

      results.push({
        segment: `Từ ${i - 1} đến ${i}`,
        pace: `${paceMinutes} : ${paceSeconds.toString().padStart(2, "0")}`,
      });
    }

    const averagePace = totalTime / totalDistance;
    const avgPaceMinutes = Math.floor(averagePace);
    const avgPaceSeconds = Math.round((averagePace - avgPaceMinutes) * 60);

    return {
      segmentPaces: results,
      averagePace: `${avgPaceMinutes}: ${avgPaceSeconds
        .toString()
        .padStart(2, "0")}`,
    };
  }

  public pageConverter(time: string, fromUnit: PaceUnit, toUnit: PaceUnit) {
    const KM_TO_MILE = 1.60934;

    const timeInMinutes = this._timeToMinutes(time);
    switch (fromUnit) {
      case "min/km":
        if (toUnit === "min/mile") {
          return this._minutesToTime(timeInMinutes * KM_TO_MILE); // phút/km → phút/mile
        } else if (toUnit === "km/h") {
          const speed = 60 / timeInMinutes; // phút/km → km/h
          return `${speed.toFixed(2)} km/h`;
        }
        break;

      case "min/mile":
        if (toUnit === "min/km") {
          return this._minutesToTime(timeInMinutes / KM_TO_MILE); // phút/mile → phút/km
        } else if (toUnit === "mile/h") {
          const speed = 60 / timeInMinutes; // phút/mile → mile/h
          return `${speed.toFixed(2)} mile/h`;
        }
        break;

      case "km/h":
        if (toUnit === "min/km") {
          const pace = 60 / timeInMinutes; // km/h → phút/km
          return this._minutesToTime(pace);
        } else if (toUnit === "mile/h") {
          const speed = timeInMinutes / KM_TO_MILE; // km/h → mile/h
          return `${speed.toFixed(2)} mile/h`;
        }
        break;

      case "mile/h":
        if (toUnit === "min/mile") {
          const pace = 60 / timeInMinutes; // mile/h → phút/mile
          return this._minutesToTime(pace);
        } else if (toUnit === "km/h") {
          const speed = timeInMinutes * KM_TO_MILE; // mile/h → km/h
          return `${speed.toFixed(2)} km/h`;
        }
        break;
    }
  }

  public calculateFinishTime(pace: string, distance: number) {
    const paceInMinutes = this._timeToMinutes(pace);
    const totalMinutes = paceInMinutes * distance; // Tổng thời gian hoàn thành tính bằng phút
    return this._minutesToTime(totalMinutes);
  }

  public calculateAll(
    points_break_in_race: PointsPage = [
      {
        time: "00:00:00",
        distance: 0,
      },
    ],
    time_run: string = "00:5:30",
    from_unit_pace: PaceUnit = "min/km",
    to_unit_pace: PaceUnit = "km/h"
    // your_pace: string,
    // distance_race: number
  ) {
    return {
      page: this.calculatePage(),
      prediction_race: this.predictionRace(),
      multi_point_pace: this.multiPointPaceCalculator(points_break_in_race),
      page_converter: this.pageConverter(
        time_run,
        from_unit_pace,
        to_unit_pace
      ),
      // calculate_finish_time: this.calculateFinishTime(your_pace, distance_race)
    };
  }
}
