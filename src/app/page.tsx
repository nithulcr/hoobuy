import { Metadata, ResolvingMetadata } from 'next';
import HomePageClient from './components/HomePageClient';


export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {

  const metadata: Metadata = {
    title: 'HooBuy',
    description: '',
    keywords: '',
  };

  return metadata;
}

export default function HomePage() {
  return <HomePageClient />;
}
