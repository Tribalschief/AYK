

import VideoSection from '@/components/VS/VS'
import Intro from "@/components/Intro";
import Services from '@/components/Services';
import Portfolio from './Portfolio/page';

export default function Home() {
  return (
    <div className="App">
      <VideoSection />
      <div>
      <Intro/>
      <Services/>
      <Portfolio/>
      </div>
  </div>
  );
}
