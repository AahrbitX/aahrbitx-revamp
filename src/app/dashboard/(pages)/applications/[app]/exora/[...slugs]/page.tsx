import React from 'react'
import Billing from './_slug_pages/Billing/Billing';
import ChannelsContent from './_slug_pages/Channels/Channels';
import InboxContent from './_slug_pages/Inbox/Inbox';
import ReportsContent from './_slug_pages/Reports/Reports';
import { notFound } from 'next/navigation';

type ExoraSlugPagesProps = {
    params: Promise<{
        slugs: string[]
    }>
}

async function ExoraSlugPages(props: ExoraSlugPagesProps) {

  const { slugs } = await props.params;

  if (!slugs) {
    return <div>No Slugs Found</div>;
  }
  
  switch(slugs[0]) {
    case "billing":
        return <Billing/>
    case "channels":
        return <ChannelsContent/>
    case "inbox":
        return <InboxContent/>
    // case "reports":
    //     return <ReportsContent/>
    default:
        return notFound();
  }

}


export default ExoraSlugPages