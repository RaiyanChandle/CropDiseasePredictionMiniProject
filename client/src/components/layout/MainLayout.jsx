import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ClickSpark from '../ui/ClickSpark';
import Grainient from '../ui/Grainient';

const MainLayout = () => {
  return (
    <ClickSpark sparkColor="#16a34a" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
      <div className="flex flex-col min-h-screen text-gray-900 relative">
        <div className="fixed inset-0 z-[-1]">
          <Grainient
            color1="#dcfce7"
            color2="#86efac"
            color3="#22c55e"
            timeSpeed={1.85}
            colorBalance={-0.02}
            warpStrength={0.8}
            warpFrequency={5.0}
            warpSpeed={2.0}
            warpAmplitude={34}
            blendAngle={0.0}
            blendSoftness={0.05}
            rotationAmount={500.0}
            noiseScale={2.4}
            grainAmount={0.1}
            grainScale={2.0}
            grainAnimated
            contrast={0.7}
            gamma={1.0}
            saturation={1.0}
            centerX={0.0}
            centerY={0.0}
            zoom={0.9}
          />
        </div>
        <Navbar />
        <main className="flex-grow max-w-7xl w-full mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ClickSpark>
  );
};

export default MainLayout;
