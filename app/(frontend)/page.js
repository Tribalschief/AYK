

import VideoSection from '@/components/VS/VS'
import Intro from "@/components/Intro";
import Services from '@/components/Services';
import ProjectShowcase from '@/components/Portfolio';



export default function Home() {
  return (
    <div className="App">
      <VideoSection />
      <div>
      <Intro/>
      <Services/>
      <ProjectShowcase/>
      </div>
  </div>
  );
}
