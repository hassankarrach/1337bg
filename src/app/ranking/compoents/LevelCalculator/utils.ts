export function calculateLevel(startLevel: number, plannedXp: number, score: number, includeBonus: boolean): number {
    const levelsXp = [0, 462, 2688, 5885, 11777, 29217, 46255, 63559, 74340, 85483, 95000, 105630, 
        124446, 145782, 169932, 197316, 228354, 263508, 303366, 348516, 399672, 457632, 
        523320, 597786, 682164, 777756, 886074, 1008798, 1147902, 1305486, 1484070];
    
    let xp = plannedXp * (score / 100);
    if (includeBonus) {
        xp += xp * 0.042;
    }

    const levelDown = Math.floor(startLevel);
    const levelUp = levelDown + 1;
    const levelXpTotal = levelsXp[levelUp] - levelsXp[levelDown];
    const currentXp = levelsXp[levelDown] + (levelXpTotal * (startLevel - levelDown));
    const finalXp = currentXp + xp;

    let i: number;
    for (i = 0; i < levelsXp.length; i++) {
        if (levelsXp[i] > finalXp) {
            break;
        }
    }

    const maxXp = levelsXp[i] - levelsXp[i - 1];
    const remainingXp = finalXp - levelsXp[i - 1];

    return i - 1 + (remainingXp / maxXp);
}