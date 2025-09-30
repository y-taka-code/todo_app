// 繰り返しタスクの処理

// 新しい期限日を計算
export const calculateNextDueDate = (currentDueDate, repeatType) => {
  if (!currentDueDate || repeatType === 'none') return null;

  const currentDate = new Date(currentDueDate);
  const nextDate = new Date(currentDate);

  switch (repeatType) {
    case 'daily':
      nextDate.setDate(currentDate.getDate() + 1);
      break;
    case 'weekly':
      nextDate.setDate(currentDate.getDate() + 7);
      break;
    case 'monthly':
      nextDate.setMonth(currentDate.getMonth() + 1);
      break;
    default:
      return null;
  }

  return nextDate.toISOString();
};

// 繰り返しタスクの新しいインスタンスを作成
export const createRecurringTask = (completedTodo) => {
  if (completedTodo.repeat === 'none') return null;

  const nextDueDate = calculateNextDueDate(completedTodo.dueDate, completedTodo.repeat);
  
  return {
    ...completedTodo,
    id: Date.now() + Math.random(), // 新しいID
    completed: false,
    dueDate: nextDueDate,
    createdAt: new Date().toISOString(),
    // 繰り返し情報は保持
  };
};

// 期限切れチェック
export const checkOverdueTasks = (todos) => {
  const now = new Date();
  return todos.filter(todo => {
    if (!todo.dueDate || todo.completed) return false;
    return new Date(todo.dueDate) < now;
  });
};

// 緊急タスク（24時間以内）のチェック
export const checkUrgentTasks = (todos) => {
  const now = new Date();
  const oneDayFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  
  return todos.filter(todo => {
    if (!todo.dueDate || todo.completed) return false;
    const dueDate = new Date(todo.dueDate);
    return dueDate > now && dueDate <= oneDayFromNow;
  });
};

// タスクの優先度を計算
export const calculateTaskPriority = (todo) => {
  if (!todo.dueDate) return 'normal';

  const now = new Date();
  const dueDate = new Date(todo.dueDate);
  const diffHours = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (diffHours < 0) return 'overdue';
  if (diffHours < 1) return 'critical';
  if (diffHours < 24) return 'high';
  if (diffHours < 72) return 'medium';
  return 'normal';
};

// タスクの優先度に基づく色を取得
export const getPriorityColor = (priority, theme) => {
  switch (priority) {
    case 'overdue':
      return theme.colors.danger;
    case 'critical':
      return '#ff1744'; // より強い赤
    case 'high':
      return theme.colors.warning;
    case 'medium':
      return '#ff9800'; // オレンジ
    default:
      return theme.colors.textSecondary;
  }
};
