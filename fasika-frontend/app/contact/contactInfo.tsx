"use client";

import { useEffect } from 'react';
import { useContactStore } from '@/app/stores/contactStore';

export default function ContactInfo() {
  const { data, loading, error, fetchContactData } = useContactStore();

  useEffect(() => {
    fetchContactData();
  }, [fetchContactData]);

  if (loading) return <div className="text-center p-8">Loading contact information...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  if (!data) return <div className="text-center p-8">No contact data available</div>;

  return (
    <div className="flex flex-col md:flex-row items-start justify-between p-8 bg-white shadow-lg rounded-lg">
      {/* Left Side */}
      <div className="w-full md:w-1/2 space-y-8">
        {/* Training Center Open Hours */}
        <div className="flex items-start space-x-4">
          <img src="/openhour.svg" alt="Open Hours Icon" className="w-12 h-12" />
          <div>
            <h3 className="text-xl font-semibold">{data.TrainingCenter}</h3>
            {data.TrainingCenterHour.split('---').map((hour, index) => (
              <p key={index} className="text-gray-600">{hour}</p>
            ))}
          </div>
        </div>

        {/* Preschool Open Hours */}
        <div className="flex items-start space-x-4">
          <img src="/openhour.svg" alt="Open Hours Icon" className="w-12 h-12" />
          <div>
            <h3 className="text-xl font-semibold">{data.PreschoolOpen}</h3>
            <p className="text-gray-600">{data.PreschoolOpenHour}</p>
          </div>
        </div>

        {/* Daycare Open Hours */}
        <div className="flex items-start space-x-4">
          <img src="/openhour.svg" alt="Open Hours Icon" className="w-12 h-12" />
          <div>
            <h3 className="text-xl font-semibold">{data.DaycareOpen}</h3>
            {data.DaycareOpenHour.split('---').map((hour, index) => (
              <p key={index} className="text-gray-600">{hour}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 mt-8 md:mt-0 space-y-8">
        <div className="flex items-start space-x-4">
          <img src="/mappin.svg" alt="Map Pin Icon" className="w-12 h-12" />
          <div>
            <h3 className="text-xl font-semibold">{data.whereFind}</h3>
            
            {/* Location 1 */}
            <div className="mt-4">
              <p className="text-gray-600 flex items-center space-x-2">
                <img src="/mappin.svg" alt="Map Pin Icon" className="w-4 h-4" />
                <span>{data.Location1}</span>
              </p>
              <p className="text-gray-600 flex items-center space-x-2">
                <img src="/phone.svg" alt="Phone Icon" className="w-4 h-4" />
                <span>{data.Location1Phone}</span>
              </p>
            </div>

            {/* Location 2 */}
            <div className="mt-4">
              <p className="text-gray-600 flex items-center space-x-2">
                <img src="/mappin.svg" alt="Map Pin Icon" className="w-4 h-4" />
                <span>{data.Location2}</span>
              </p>
              <p className="text-gray-600 flex items-center space-x-2">
                <img src="/phone.svg" alt="Phone Icon" className="w-4 h-4" />
                <span>{data.Location2Phone}</span>
              </p>
            </div>

            {/* Location 3 */}
            <div className="mt-4">
              <p className="text-gray-600 flex items-center space-x-2">
                <img src="/mappin.svg" alt="Map Pin Icon" className="w-4 h-4" />
                <span>{data.Location3}</span>
              </p>
              <p className="text-gray-600 flex items-center space-x-2">
                <img src="/phone.svg" alt="Phone Icon" className="w-4 h-4" />
                <span>{data.Location3Phone}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}