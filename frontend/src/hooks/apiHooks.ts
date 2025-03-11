import {useEffect, useState} from 'react';
import {DestinationWithFileData} from '../types/DataTypes';
import {fetchData} from '../lib/functions';

const useDestinations = () => {
  const [destinations, setDestinations] = useState<DestinationWithFileData[]>(
    [],
  );

  useEffect(() => {
    const getDestinations = async () => {
      try {
        const destinations = await fetchData<DestinationWithFileData[]>(
          import.meta.env.VITE_MEDIA_API + '/destinations/all',
        );
        console.log(destinations);
        setDestinations(destinations);
      } catch (err) {
        console.error((err as Error).message);
      }
    };

    getDestinations();
  }, []);

  return {destinations};
};

export {useDestinations};
