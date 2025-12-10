import { getUser } from "@/features/users/lib/requests";
import UpdateUserFormView from "@/features/users/views/mutation-views/update-user-form-view";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log(id);
  const user = await getUser(id);
  console.log(user);
  if (!user.data) {
    notFound();
  }
  return (
    <div>
      <UpdateUserFormView user={user.data} />
    </div>
  );
}
