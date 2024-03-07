import { Injectable } from '@angular/core';
import configs from '../configs';

@Injectable({
  providedIn: 'root',
})
export class VoteCooldownService {
  private cacheMap = new Map<number, number>(); // Map<ID, cooldownEndTime>

  constructor() {}

  findCooldown(id: number): boolean {
    if (this.cacheMap.has(id)) {
      return true;
    } else {
      this.setCooldown(id);
      return false;
    }
  }

  private setCooldown(id: number): void {
    const cooldownEndTime =
      new Date().getTime() + configs.facemashConfig.DELAY * 1000;
    this.cacheMap.set(id, cooldownEndTime);
  }

  getRemainingCooldown(id: number): number {
    if (this.cacheMap.has(id)) {
      const currentTime = new Date().getTime();
      const cooldownEndTime = this.cacheMap.get(id)!;
      const remainingTime = cooldownEndTime - currentTime;
      const remainingSeconds = Math.max(remainingTime / 1000, 0); // Convert milliseconds to seconds
      return parseFloat(remainingSeconds.toFixed(2));
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
