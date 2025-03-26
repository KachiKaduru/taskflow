export const useTodayTaskData = ({ tasks = [] }) => {
  const today = new Date().toDateString();

  // Filter and sort tasks
  const todaysTasks = tasks
    .filter((task) => task.due_date && new Date(task.due_date).toDateString() === today)
    .sort((a, b) => {
      if (a.is_completed !== b.is_completed) return a.is_completed ? 1 : -1;
      if (a.isPriority !== b.isPriority) return b.isPriority ? 1 : -1;
      return new Date(a.due_date) - new Date(b.due_date);
    });

  const completedTasks = tasks.filter((task) => task.is_completed).length;
  const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  return { todaysTasks, completedTasks, completionRate };
};
