
import { useSelector } from "react-redux";
import { ProfileForm } from "@/Components/Forms/ProfileForm";
import { PasswordForm } from "@/Components/Forms/PasswordForm";
export const ProfileSettings = () => {
  // Form Data For Profile Settings
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div className="p-5 ">
      <h1 className="text-fontColor text-4xl font-semibold mb-5">
        اعدادات الحساب
      </h1>
      {/* ProfileData  */}
      <div className="my-3">

        <ProfileForm user={user} />
      </div>

      <PasswordForm />
    </div>
  );
};
