import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoteCooldownService {

  private cacheMap = new Map<number, number>(); // Map<ID, cooldownEndTime>

  constructor() { }

  findCooldown(id: number): boolean {
    if (this.cacheMap.has(id)) {
      console.log("Cooldown active");
      return true;
    } else {
      this.setCooldown(id);
      return false;
    }
  }

  private setCooldown(id: number): void {
    const cooldownEndTime = new Date().getTime() + 60 * 1000;
    this.cacheMap.set(id, cooldownEndTime);
  }

  getRemainingCooldown(id: number): number {
    if (this.cacheMap.has(id)) {
      const currentTime = new Date().getTime();
      const cooldownEndTime = this.cacheMap.get(id)!;
      const remainingTime = cooldownEndTime - currentTime;
      return Math.max(remainingTime, 0); // Ensure remaining time is non-negative
    } else {
      return 0; // No cooldown active for the given ID
    }
  }

  getAllCooldowns(): Map<number, number> {
    return new Map<number, number>(this.cacheMap); // Return a shallow copy of the cache map
  }

  removeExpiredCooldowns(): void {
    const currentTime = new Date().getTime();
    this.cacheMap.forEach((value, key) => {
      if (value <= currentTime) {
        this.cacheMap.delete(key);
        console.log(`Removed cooldown for id: ${key}`);
      }
    });
  }
}
