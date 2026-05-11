import React from 'react';

const About = () => {
  return (
    <div className="bg-white px-6 py-12 lg:px-8 shadow-sm rounded-xl">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-green-700 sm:text-4xl">
          About CropShield
        </h1>
        <p className="mt-6 text-xl leading-8 text-gray-700">
          CropShield is an intelligent crop disease prediction and management platform dedicated to helping farmers identify and mitigate crop diseases early.
        </p>
        <div className="mt-10 max-w-2xl">
          <p>
            Agriculture is the backbone of our economy, but crop diseases can devastate harvests and livelihoods. Our mission is to leverage advanced machine learning models and computer vision to empower farmers with quick, reliable diagnostics. 
          </p>
          <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
            <li className="flex gap-x-3">
              <span className="font-semibold text-green-700">Early Detection:</span>
              Upload a photo of a suspicious plant leaf, and our system will identify potential diseases within seconds.
            </li>
            <li className="flex gap-x-3">
              <span className="font-semibold text-green-700">Actionable Advice:</span>
              Receive tailored recommendations on how to treat the disease, what fertilizers or pesticides to use, and how to prevent future outbreaks.
            </li>
            <li className="flex gap-x-3">
              <span className="font-semibold text-green-700">Community Mapping:</span>
              Our admin dashboard visualizes disease outbreaks on a map, allowing agricultural officers to track regional spreads and issue warnings.
            </li>
          </ul>
          <p className="mt-8">
            By providing easy-to-use tools directly on their devices, we are bringing the power of AI to the fields. Together, we can build a more resilient and productive agricultural future.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
