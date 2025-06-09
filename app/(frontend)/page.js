'use client';

import VideoSection from '@/components/VS/VS'
import UltimateHome from '../../components/Intro';
import UltimateServices from '../../components/Services';
import UltimatePortfolioContact from '../../components/Portfolio';
import { useState, useEffect } from 'react';





export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <div className="App">
      <VideoSection />
      <div>
      <UltimateHome />
      <UltimateServices />
      <UltimatePortfolioContact />
      </div>
  </div>
  );
}
