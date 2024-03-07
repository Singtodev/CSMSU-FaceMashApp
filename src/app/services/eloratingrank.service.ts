import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EloratingrankService {
  constructor() {}

  public calculateExpectedScore(ratingA: any, ratingB: any) {
    return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
  }

  public calculateExpectedScoreString(ratingA: any, ratingB: any) {
    return `1 / (1 + 10 **(${ratingB} - ${ratingA}) / 400) = ` + this.calculateExpectedScore(ratingA , ratingB);
  }

  public calculateRatingChange(
    ratingA: any,
    expectedScoreA: any,
    actualScoreA: any,
    kFactor: any
  ) {
    return Math.round(kFactor * (actualScoreA - expectedScoreA));
  }

  public updateRatings(
    ratingA: any,
    ratingB: any,
    actualScoreA: any,
    kFactor: any
  ) {
    const expectedScoreA = this.calculateExpectedScore(ratingA, ratingB);
    const ratingChangeA = this.calculateRatingChange(
      ratingA,
      expectedScoreA,
      actualScoreA,
      kFactor
    );

    const cal = this.calculateExpectedScoreString(ratingA , ratingB);

    const newRatingA = ratingA + ratingChangeA;
    const newRatingB = ratingB - ratingChangeA;

    return [newRatingA, newRatingB , cal];
  }
}
