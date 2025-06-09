
import VideoSection from '@/components/VS/VS';
import UltimateHome from '../../components/Intro';
import UltimateServices from '../../components/Services';
import UltimatePortfolioContact from '../../components/Portfolio';

export default function Home() {
  

  return (
    <div className="App" >
      <VideoSection />
      <div>
        <UltimateHome />
        <UltimateServices />
        <UltimatePortfolioContact />
      </div>
    </div>
  );
}