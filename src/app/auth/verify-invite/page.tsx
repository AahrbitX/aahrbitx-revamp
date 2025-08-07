import { OTPVerificationForm } from "./otp";

export default async function VerifyInvitePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;

  return <OTPVerificationForm searchParams={sp} />;
}
