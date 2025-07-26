import { getWidgetData } from "@/actions/organizations/widgetsData";
import {
  UserApplicationWidget,
  UserNotificationWidget,
  UserOrganizationWidget,
} from "./components/widgets";

export default function Page() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 pt-0 @container">
        <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min grid grid-row-4 grid-cols-1 @lg:grid-cols-2 @lg:grid-rows-2 @2xl:grid-cols-3 gap-2 p-2">
          <UserOrganizationWidget />
          <UserApplicationWidget />
          <UserNotificationWidget />
        </div>
      </div>
    </>
  );
}
