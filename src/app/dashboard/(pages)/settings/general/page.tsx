import React from "react";
import ContentSection from "../components/content-section";
import ProfileForm from "./profile-form";

function GeneralSettingsPage() {
  return (
    <ContentSection title="General" desc="Manage your general settings">
      <ProfileForm />
    </ContentSection>
  );
}

export default GeneralSettingsPage;
