import LoadingButton from "@/components/loading-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const ChangePasswordForm = () => {
  return (
    <div className="bg-white border rounded-md space-y-8 p-5">
      <form action="">
        <p className="text-lg font-semibold mb-3 ">Change password </p>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Current Password</Label>
            <Input
              placeholder="Current password"
              type="text"
              name="currentPassword"
            />
          </div>
          <div className="space-y-2">
            <Label>New Password</Label>
            <Input placeholder="New password" type="password" name="password" />
          </div>
          <div className="space-y-2">
            <Label>Cofirm Password</Label>
            <Input
              placeholder="Confirm password"
              type="password"
              name="password"
            />
          </div>
          <div>
            <LoadingButton type="button">Change Password</LoadingButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
