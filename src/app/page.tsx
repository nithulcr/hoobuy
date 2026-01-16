import { Metadata, ResolvingMetadata } from 'next';
import HomePageClient from './components/HomePageClient';
import { getLatestProperties } from '../lib/getProperties';


export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {

  const metadata: Metadata = {
    title: 'HOOBUY REALTORS',
    description: '',
    keywords: '',
  };

  return metadata;
}

export default async function HomePage() {
  const properties = await getLatestProperties();
  return <HomePageClient properties={properties} />;
}
