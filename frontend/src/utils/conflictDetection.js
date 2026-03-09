export const detectConflicts = (schedule) => {
  const conflicts = [];

  for (let i = 0; i < schedule.length; i++) {
    for (let j = i + 1; j < schedule.length; j++) {
      const s1 = schedule[i];
      const s2 = schedule[j];

      if (s1.time === s2.time) {
        if (s1.room === s2.room) conflicts.push({ type: "Room", schedule: [s1, s2] });
        if (s1.facultyId === s2.facultyId) conflicts.push({ type: "Faculty", schedule: [s1, s2] });
      }
    }
  }

  return conflicts;
};
