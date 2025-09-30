// ブラウザ通知の管理
class NotificationManager {
  constructor() {
    this.notifications = new Map();
    this.isPermissionGranted = false;
    this.requestPermission();
  }

  // 通知の許可をリクエスト
  async requestPermission() {
    if ('Notification' in window) {
      if (Notification.permission === 'default') {
        const permission = await Notification.requestPermission();
        this.isPermissionGranted = permission === 'granted';
      } else {
        this.isPermissionGranted = Notification.permission === 'granted';
      }
    }
  }

  // 通知をスケジュール
  scheduleNotification(todo) {
    if (!todo.dueDate || !this.isPermissionGranted) return;

    const now = new Date();
    const dueDate = new Date(todo.dueDate);
    const timeUntilDue = dueDate.getTime() - now.getTime();

    // 期限が過去の場合は通知しない
    if (timeUntilDue <= 0) return;

    // 既存の通知をクリア
    this.clearNotification(todo.id);

    // 期限の1時間前と15分前に通知
    const oneHourBefore = timeUntilDue - (60 * 60 * 1000);
    const fifteenMinutesBefore = timeUntilDue - (15 * 60 * 1000);

    // 1時間前の通知（1時間以上先の場合のみ）
    if (oneHourBefore > 0) {
      const timeoutId1 = setTimeout(() => {
        this.showNotification(
          'Todo リマインダー',
          `「${todo.text}」の期限まで1時間です！`,
          todo.id
        );
      }, oneHourBefore);
      this.notifications.set(`${todo.id}_1h`, timeoutId1);
    }

    // 15分前の通知（15分以上先の場合のみ）
    if (fifteenMinutesBefore > 0) {
      const timeoutId2 = setTimeout(() => {
        this.showNotification(
          'Todo 緊急リマインダー',
          `「${todo.text}」の期限まで15分です！`,
          todo.id
        );
      }, fifteenMinutesBefore);
      this.notifications.set(`${todo.id}_15m`, timeoutId2);
    }

    // 期限切れ通知
    const timeoutId3 = setTimeout(() => {
      this.showNotification(
        'Todo 期限切れ',
        `「${todo.text}」の期限が過ぎました！`,
        todo.id
      );
    }, timeUntilDue);
    this.notifications.set(`${todo.id}_overdue`, timeoutId3);
  }

  // 通知を表示
  showNotification(title, body, todoId) {
    if (!this.isPermissionGranted) return;

    const notification = new Notification(title, {
      body: body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: `todo-${todoId}`,
      requireInteraction: false,
      silent: false
    });

    // 通知をクリックしたら閉じる
    notification.onclick = () => {
      notification.close();
      // 必要に応じてアプリにフォーカス
      window.focus();
    };

    // 5秒後に自動で閉じる
    setTimeout(() => {
      notification.close();
    }, 5000);
  }

  // 通知をクリア
  clearNotification(todoId) {
    const keys = [`${todoId}_1h`, `${todoId}_15m`, `${todoId}_overdue`];
    keys.forEach(key => {
      const timeoutId = this.notifications.get(key);
      if (timeoutId) {
        clearTimeout(timeoutId);
        this.notifications.delete(key);
      }
    });
  }

  // すべての通知をクリア
  clearAllNotifications() {
    this.notifications.forEach(timeoutId => {
      clearTimeout(timeoutId);
    });
    this.notifications.clear();
  }

  // 期限チェック（定期実行用）
  checkOverdueTasks(todos) {
    const now = new Date();
    const overdueTodos = todos.filter(todo => {
      if (!todo.dueDate || todo.completed) return false;
      return new Date(todo.dueDate) < now;
    });

    return overdueTodos;
  }
}

// シングルトンインスタンス
export const notificationManager = new NotificationManager();
