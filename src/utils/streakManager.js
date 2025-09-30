// 連続達成カウントの管理

// 連続達成の計算
export const calculateStreak = (todo, completionHistory = []) => {
  if (!todo.repeat || todo.repeat === 'none') return 0;

  // 完了履歴がない場合は、作成日からの日数を計算
  if (completionHistory.length === 0) {
    return todo.completed ? 1 : 0;
  }

  // 完了履歴を日付順でソート
  const sortedHistory = completionHistory
    .map(date => new Date(date))
    .sort((a, b) => b - a); // 新しい日付から古い日付へ

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 今日が完了済みの場合
  if (todo.completed && isToday(today, sortedHistory[0])) {
    streak = 1;
  }

  // 連続日数を計算
  for (let i = 0; i < sortedHistory.length; i++) {
    const currentDate = new Date(sortedHistory[i]);
    const expectedDate = new Date(today);
    expectedDate.setDate(today.getDate() - i);

    if (isSameDay(currentDate, expectedDate)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

// 日付が同じ日かどうかチェック
const isSameDay = (date1, date2) => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

// 今日かどうかチェック
const isToday = (today, date) => {
  return isSameDay(today, new Date(date));
};

// 完了履歴を更新
export const updateCompletionHistory = (todo, isCompleted) => {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD形式
  
  if (!todo.completionHistory) {
    todo.completionHistory = [];
  }

  if (isCompleted) {
    // 完了：今日の日付を追加（重複チェック）
    if (!todo.completionHistory.includes(today)) {
      todo.completionHistory.push(today);
    }
  } else {
    // 未完了：今日の日付を削除
    todo.completionHistory = todo.completionHistory.filter(date => date !== today);
  }

  return todo.completionHistory;
};

// 連続達成の状態を取得
export const getStreakStatus = (streak) => {
  if (streak === 0) return { status: 'none', message: '開始しよう！', emoji: '🔥' };
  if (streak < 3) return { status: 'start', message: 'いいスタート！', emoji: '🔥' };
  if (streak < 7) return { status: 'good', message: '順調！', emoji: '🔥🔥' };
  if (streak < 30) return { status: 'great', message: '素晴らしい！', emoji: '🔥🔥🔥' };
  if (streak < 100) return { status: 'amazing', message: '驚異的！', emoji: '🔥🔥🔥🔥' };
  return { status: 'legendary', message: '伝説級！', emoji: '🔥🔥🔥🔥🔥' };
};

// 次の目標までの日数
export const getNextMilestone = (streak) => {
  const milestones = [3, 7, 14, 30, 60, 100, 365];
  const nextMilestone = milestones.find(milestone => milestone > streak);
  
  if (!nextMilestone) {
    return { daysLeft: 0, milestone: 'MAX', message: '最大達成！' };
  }
  
  const daysLeft = nextMilestone - streak;
  return {
    daysLeft,
    milestone: nextMilestone,
    message: `${nextMilestone}日まであと${daysLeft}日`
  };
};

// 連続達成の統計情報
export const getStreakStats = (todos) => {
  const recurringTodos = todos.filter(todo => todo.repeat && todo.repeat !== 'none');
  
  const stats = {
    totalRecurring: recurringTodos.length,
    activeStreaks: 0,
    longestStreak: 0,
    totalStreakDays: 0,
    averageStreak: 0
  };

  recurringTodos.forEach(todo => {
    const streak = calculateStreak(todo, todo.completionHistory);
    if (streak > 0) {
      stats.activeStreaks++;
      stats.totalStreakDays += streak;
      stats.longestStreak = Math.max(stats.longestStreak, streak);
    }
  });

  stats.averageStreak = stats.activeStreaks > 0 
    ? Math.round(stats.totalStreakDays / stats.activeStreaks) 
    : 0;

  return stats;
};
