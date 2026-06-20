"use client";
import DashboardPageHeader from "@/components/dashboard-page-header/DashboardPageHeader";
import InputForm from "@/components/input-form/InputForm";
import TextareaForm from "@/components/textarea-form/TextareaForm";
import { ProfileInfoService } from "@/services/profileInfo.service";
import Notification, {
  NotificationState,
} from "@/components/notification/Notification";
import { Plus } from "lucide-react";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import {
  createProfileInfo,
  updateProfileInfo,
} from "@/utils/actions/heroSectionActions";

export interface DashboardHeroPageProbs {
  _id?: string;
  fullName: string;
  title: string;
  bio: string;
  about: string;
  email: string;
  phone: string;
  location: string;
  avatar: string | File;
  resume: string;
  github: string;
  linkedin: string;
  leetcode: string;
  codeforces: string;
}

const initialFormData: DashboardHeroPageProbs = {
  fullName: "",
  title: "",
  bio: "",
  about: "",
  email: "",
  phone: "",
  location: "",
  avatar: "",
  resume: "",
  github: "",
  linkedin: "",
  leetcode: "",
  codeforces: "",
};

function DashboardHeroPage({
  profileInfoData,
}: {
  profileInfoData: DashboardHeroPageProbs;
}) {
  const [formData, setFormData] = useState(profileInfoData || initialFormData);
  const [isEmpty, setEmpty] = useState(profileInfoData ? false : true);
  const file = useRef<HTMLInputElement>(null);
  const [notification, setNotification] = useState<NotificationState | null>(
    null,
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.currentTarget;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleFileChange = () => {
    if (file.current && file.current.files && file.current.files.length > 0) {
      const selectedFile = file.current.files[0];
      setFormData((prev) => {
        return {
          ...prev,
          avatar: selectedFile,
        };
      });
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("mohamed");
    setIsSaving(true);
    try {
      const formElement = e.currentTarget;
      const formData = new FormData(formElement);

      await updateProfileInfo(formData);

      setNotification({
        message: "Profile info updated successfully.",
        type: "success",
      });
    } catch (error: any) {
      setNotification({
        message: error.message || "Failed to update profile info.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const formElement = e.currentTarget;
      const formData = new FormData(formElement);

      await createProfileInfo(formData);

      setNotification({
        message: "Profile info created successfully.",
        type: "success",
      });
      setEmpty(false);
    } catch (error: any) {
      setNotification({
        message: error.message || "Failed to create profile info.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };
  console.log(isSaving);

  return (
    <>
      <div>
        <DashboardPageHeader
          title={"Hero Section"}
          desc={"Manage your portfolio hero/landing section"}
        />
      </div>
      <div className="mt-8 space-y-8">
        <form
          onSubmit={(e) => {
            !isEmpty ? handleSave(e) : handleCreate(e);
          }}
          className="border border-border p-4 rounded-md bg-card flex flex-col gap-4"
        >
          <div className="flex flex-col gap-4">
            <InputForm
              id={"fullname"}
              label="Full Name"
              placeholder="Your name"
              name="fullName"
              value={formData.fullName}
              handleChange={handleChange}
            />
            <InputForm
              id={"title"}
              label="Title"
              placeholder="Your role"
              name="title"
              value={formData.title}
              handleChange={handleChange}
            />
            <TextareaForm
              id={"bio"}
              label="Bio"
              placeholder="Brief description"
              name="bio"
              value={formData.bio}
              handleChange={handleChange}
            />
            <TextareaForm
              id={"about"}
              label="About"
              placeholder="About me"
              name="about"
              value={formData.about}
              handleChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <InputForm
              id={"email"}
              label="Email"
              placeholder="Your email"
              name="email"
              type="email"
              value={formData.email}
              handleChange={handleChange}
            />
            <InputForm
              id={"phone"}
              label="Phone"
              placeholder="Your phone"
              name="phone"
              value={formData.phone}
              handleChange={handleChange}
            />
            <InputForm
              id={"location"}
              label="Location"
              placeholder="Your location"
              name="location"
              value={formData.location}
              handleChange={handleChange}
            />
            <InputForm
              id={"resume"}
              label="Resume"
              placeholder="Your resume"
              name="resume"
              value={formData.resume}
              handleChange={handleChange}
            />
            <InputForm
              id={"github"}
              label="Github"
              placeholder="Your github link"
              name="github"
              value={formData.github}
              handleChange={handleChange}
            />
            <InputForm
              id={"linkedin"}
              label="LinkedIn"
              placeholder="Your linkedin link"
              name="linkedin"
              value={formData.linkedin}
              handleChange={handleChange}
            />
            <InputForm
              id={"leetcode"}
              label="Leetcode"
              placeholder="Your leetcode link"
              name="leetcode"
              value={formData.leetcode}
              handleChange={handleChange}
            />
            <InputForm
              id={"codeforces"}
              label="Codeforces"
              placeholder="Your codeforces link"
              name="codeforces"
              value={formData.codeforces}
              handleChange={handleChange}
            />
          </div>
          {/* image */}
          <div className="flex flex-col items-start gap-1 w-full mt-4">
            <label htmlFor="avatar">Avatar</label>
            <input
              id={"avatar"}
              name="avatar"
              ref={file}
              onChange={handleFileChange}
              type="file"
              className="border border-border py-2 px-4 rounded-md bg-accent w-full focus:outline-(--portfolio-accent) "
            />
          </div>
          <hr className="w-full h-0.5 bg-border" />
          <button
            disabled={isSaving}
            className="py-2 px-4 rounded-md bg-(--portfolio-accent) hover:bg-(--portfolio-accent-hover) text-white w-fit disabled:opacity-50 transition-opacity"
          >
            {isSaving
              ? "Processing..."
              : !isEmpty
                ? "Save Change"
                : "Create profile info"}
          </button>
        </form>
      </div>

      <Notification
        notification={notification}
        onClose={() => setNotification(null)}
      />
    </>
  );
}

export default DashboardHeroPage;
