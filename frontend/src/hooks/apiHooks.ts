import {useEffect, useState} from 'react';
import {
  DestinationDataWithRating,
  UserWithoutPassword,
} from '../types/DataTypes';
import {fetchData} from '../lib/functions';
import {Credentials} from '../types/UserTypes';
import {LoginResponse, UserResponse} from '../types/MessageTypes';

const useDestinations = () => {
  const [destinations, setDestinations] = useState<DestinationDataWithRating[]>(
    [],
  );

  useEffect(() => {
    const getDestinations = async () => {
      try {
        const destinations = await fetchData<DestinationDataWithRating[]>(
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

const useAuthentication = () => {
  const postLogin = async (creds: Credentials) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(creds),
    };

    try {
      const response = await fetchData<LoginResponse>(
        import.meta.env.VITE_AUTH_API + '/auth/login',
        options,
      );
      // console.log(response);
      return response;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };
  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token: string) => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const user = await fetchData<UserResponse>(
        import.meta.env.VITE_AUTH_API + '/users/getbytoken',
        options,
      );
      return user;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  return {getUserByToken};
};

export {useDestinations, useAuthentication, useUser};
