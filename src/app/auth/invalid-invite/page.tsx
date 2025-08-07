export default function InvalidInvite() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-red-600">
          Invalid or Expired Invite
        </h1>
        <p className="text-gray-500">
          This invite link is no longer valid. Please contact your admin.
        </p>
      </div>
    </div>
  );
}
