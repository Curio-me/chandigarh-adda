import { useState, useEffect } from 'react';

export interface TelemetryData {
  temp: number;
  aqi: number;
  aqiLabel: 'GOOD' | 'SATISFACTORY' | 'MODERATE' | 'POOR' | 'SEVERE';
  aqiColor: string;
  isLive: boolean;
}

const CACHE_KEY = 'chd_telemetry_cache_v1';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

function getAQILabel(aqi: number): TelemetryData['aqiLabel'] {
  if (aqi <= 50) return 'GOOD';
  if (aqi <= 100) return 'SATISFACTORY';
  if (aqi <= 150) return 'MODERATE';
  if (aqi <= 200) return 'POOR';
  return 'SEVERE';
}

function getAQIColor(label: TelemetryData['aqiLabel']): string {
  switch (label) {
    case 'GOOD':
      return 'text-emerald-300 bg-emerald-500/20 border-emerald-500/40';
    case 'SATISFACTORY':
      return 'text-lime-300 bg-lime-500/20 border-lime-500/40';
    case 'MODERATE':
      return 'text-amber-300 bg-amber-500/20 border-amber-500/40';
    case 'POOR':
      return 'text-orange-400 bg-orange-500/20 border-orange-500/40';
    case 'SEVERE':
      return 'text-red-400 bg-red-500/20 border-red-500/40';
    default:
      return 'text-amber-300 bg-amber-500/20 border-amber-500/40';
  }
}

export function useChandigarhWeather(): TelemetryData {
  const [data, setData] = useState<TelemetryData>(() => {
    // Check cached value
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
          return {
            temp: parsed.temp,
            aqi: parsed.aqi,
            aqiLabel: getAQILabel(parsed.aqi),
            aqiColor: getAQIColor(getAQILabel(parsed.aqi)),
            isLive: true,
          };
        }
      }
    } catch {
      // ignore
    }

    return {
      temp: 22,
      aqi: 120,
      aqiLabel: 'MODERATE',
      aqiColor: 'text-amber-300 bg-amber-500/20 border-amber-500/40',
      isLive: false,
    };
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchLiveTelemetry() {
      try {
        // Fetch weather and air quality simultaneously
        const [weatherRes, aqiRes] = await Promise.all([
          fetch(
            'https://api.open-meteo.com/v1/forecast?latitude=30.7333&longitude=76.7794&current=temperature_2m'
          ),
          fetch(
            'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=30.7333&longitude=76.7794&current=us_aqi'
          ),
        ]);

        if (!weatherRes.ok || !aqiRes.ok) return;

        const weatherJson = await weatherRes.json();
        const aqiJson = await aqiRes.json();

        const liveTemp = Math.round(weatherJson?.current?.temperature_2m ?? 22);
        const liveAqi = Math.round(aqiJson?.current?.us_aqi ?? 120);
        const label = getAQILabel(liveAqi);
        const color = getAQIColor(label);

        if (isMounted) {
          setData({
            temp: liveTemp,
            aqi: liveAqi,
            aqiLabel: label,
            aqiColor: color,
            isLive: true,
          });

          try {
            sessionStorage.setItem(
              CACHE_KEY,
              JSON.stringify({
                temp: liveTemp,
                aqi: liveAqi,
                timestamp: Date.now(),
              })
            );
          } catch {
            // ignore
          }
        }
      } catch (err) {
        console.warn('Live telemetry fetch fallback:', err);
      }
    }

    fetchLiveTelemetry();

    // Refresh every 10 minutes
    const interval = setInterval(fetchLiveTelemetry, CACHE_TTL_MS);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return data;
}
