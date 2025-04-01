// app/api/tasks/route.js
import { getTasks } from "@/app/_lib/actions/taskActions";

export async function GET() {
  const tasks = await getTasks();
  return Response.json(tasks);
}
