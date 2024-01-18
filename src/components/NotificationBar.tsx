import { useEffect, useState } from 'react';
import { MdOutlineBatteryChargingFull, MdOutlineBatteryFull } from 'react-icons/md';

const NotificationBar = () => {
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    (async () => {
      if ('getBattery' in navigator) {
        //@ts-ignore
        const battery = await navigator.getBattery();
        setBatteryLevel(battery.level * 100);
        setIsCharging(battery.charging);
        // @ts-ignore
        battery.addEventListener('chargingchange', (e) => {
          setIsCharging(e.currentTarget.charging);
        });
        //@ts-ignore
        battery.addEventListener('levelchange', (e) => {
          setBatteryLevel(e.currentTarget.level * 100);
        });
      }
    })(); // This is an IIFE
  }, []);
  return (
    <div className="flex items-center justify-between w-full px-3 py-2 bg-black max-h-8">
      <div className="text-sm">Activities</div>
      <div className="text-sm">
        {new Date().toLocaleString('default', {
          month: 'short',
          day: 'numeric',
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
      <div className="flex items-center text-xl">
        {isCharging ? <MdOutlineBatteryChargingFull /> : <MdOutlineBatteryFull />}
        <div className="text-sm">{Math.round(batteryLevel)}%</div>
      </div>
    </div>
  );
};

export default NotificationBar;
