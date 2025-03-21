import {useEffect, useState} from 'react';
import {
  Category,
  DestinationCreate,
  DestinationDataWithRating,
  Review,
  ReviewCreate,
  SubDestinationCreate,
  SubDestinationWithFileData,
} from '../types/DataTypes';
import {fetchData} from '../lib/functions';
import {Credentials} from '../types/UserTypes';
import {
  CreatedDestinationMessage,
  CreatedReviewMessage,
  FileUploadResponse,
  LoginResponse,
  SuccessUserCreationResponse,
  UserResponse,
} from '../types/MessageTypes';

const useDestinations = () => {
  const [destinations, setDestinations] = useState<DestinationDataWithRating[]>(
    [],
  );

  const [categories, setCategories] = useState<Category[]>([]);
  const [subDestinations, setSubDestinations] = useState<
    SubDestinationWithFileData[]
  >([]);

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

  const getSubDestinations = async (destinationId: number) => {
    try {
      const subDestinations = await fetchData<SubDestinationWithFileData[]>(
        import.meta.env.VITE_MEDIA_API +
          '/subdest/bydestination/' +
          destinationId,
      );
      console.log(subDestinations);
      setSubDestinations(subDestinations);
    } catch (err) {
      console.error((err as Error).message);
    }
  };

  const postDestination = async (
    file: File,
    destinationInformation: Omit<DestinationCreate, 'file_data' | 'user_id'>,
    token: string,
  ) => {
    const {postFile} = useFileUpload();

    try {
      const fileResponse = await postFile(file, token);
      console.log('fileResponse: ', fileResponse);
      const destination = {
        ...destinationInformation,
        file_data: {
          file_name: fileResponse.file_name,
          file_url: fileResponse.file_url,
        },
      };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(destination),
      };

      const response = await fetchData<CreatedDestinationMessage>(
        import.meta.env.VITE_MEDIA_API + '/destinations/create',
        options,
      );

      getDestinations();

      // This don't work cuz response don't have average_rating
      // if want to use this, need to fetch all destinations again
      // setDestinations([...destinations, response]);
      console.log(response);
    } catch (err) {
      console.error((err as Error).message);
    }
  };

  const postSubDestination = async (
    file: File,
    attractionInfo: SubDestinationCreate,
    token: string,
  ) => {
    const {postFile} = useFileUpload();

    try {
      const fileResponse = await postFile(file, token);
      console.log('fileResponse: ', fileResponse);
      const subDestination = {
        ...attractionInfo,
        file_data: {
          file_name: fileResponse.file_name,
          file_url: fileResponse.file_url,
        },
      };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(subDestination),
      };

      const response = await fetchData<CreatedDestinationMessage>(
        import.meta.env.VITE_MEDIA_API + '/subdest/create',
        options,
      );

      // getSubDestinations(attractionInfo.destination_id);

      // This don't work cuz response don't have average_rating
      // if want to use this, need to fetch all destinations again
      // setSubDestinations([...subDestinations, response]);
      console.log(response);
      return response.message;
    } catch (err) {
      console.error((err as Error).message);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categories = await fetchData<Category[]>(
          import.meta.env.VITE_MEDIA_API + '/destinations/categories',
        );

        const sortedCategories = categories.sort((a, b) => {
          // sort 'other' category to the end
          if (a.name == 'other' && b.name != 'other') return 1;
          if (a.name != 'other' && b.name == 'other') return -1;
          // sort other categories alphabetically
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;

          return 0;
        });
        console.log(sortedCategories);
        setCategories(sortedCategories);
        // setCategories(categories);
      } catch (err) {
        console.error((err as Error).message);
      }
    };

    getCategories();
    getDestinations();
  }, []);

  return {
    destinations,
    categories,
    subDestinations,
    getSubDestinations,
    postDestination,
    postSubDestination,
  };
};

const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const getReviewsByDestId = async (destinationId: number) => {
    try {
      console.log('Fetching reviews for destination id: ' + destinationId);

      const reviews = await fetchData<Review[]>(
        import.meta.env.VITE_MEDIA_API +
          '/reviews/getall/byid/' +
          destinationId,
      );
      console.log(reviews);
      setReviews(reviews);
    } catch (err) {
      if ((err as Error).message === 'No reviews found') {
        console.log('No reviews found for destination id: ' + destinationId);
        setReviews([]);
        return;
      }

      console.error((err as Error).message);
    }
  };

  const postReview = async (
    reviewData: Omit<ReviewCreate, 'user_id'>,
    token: string,
  ) => {
    // Convert trip type to lowercase to match the database
    reviewData.trip_type = reviewData.trip_type.toLowerCase();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reviewData),
    };

    try {
      const response = await fetchData<CreatedReviewMessage>(
        import.meta.env.VITE_MEDIA_API + '/reviews/create',
        options,
      );
      console.log(response);
      return response.message;
      // Don't work cuz response don't have username or profile_pic
      // setReviews([...reviews, response.review]);
    } catch (err) {
      console.error((err as Error).message);
    }
  };

  return {reviews, getReviewsByDestId, postReview};
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

  const postRegister = async (creds: Credentials & {email: string}) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(creds),
    };

    try {
      const response = await fetchData<SuccessUserCreationResponse>(
        import.meta.env.VITE_AUTH_API + '/auth/register',
        options,
      );
      return response.message;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  return {postLogin, postRegister};
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

const useFileUpload = () => {
  const postFile = async (
    file: File,
    token: string,
  ): Promise<FileUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    try {
      const response = await fetchData<FileUploadResponse>(
        import.meta.env.VITE_FILE_API + '/files/upload',
        options,
      );

      return response;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  return {postFile};
};

export {useDestinations, useAuthentication, useUser, useFileUpload, useReviews};
