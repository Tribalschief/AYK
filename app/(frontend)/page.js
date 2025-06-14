
import VideoSection from '@/components/VS/VS';
import UltimateHome from '../../components/Intro';
import UltimateServices from '../../components/Services';
import UltimatePortfolioContact from '../../components/Portfolio';
import Experience from '@/components/Experience';

export default function Home() {
  

  return (
    <div className="App" >
      <VideoSection />
      <div>
        <UltimateHome />
        <Experience/>
        <UltimateServices />
        <UltimatePortfolioContact />
      </div>
    </div>
  );
}