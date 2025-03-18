import {Rating, ThinRoundedStar} from '@smastrom/react-rating';
import {SubDestinationWithFileData} from '../../types/DataTypes';
import {MdReportProblem} from 'react-icons/md';

type SubDestCardProps = {
  subDestination: SubDestinationWithFileData;
};

const SubDestCard = ({subDestination}: SubDestCardProps) => {
  // To capitalize the first letter of a subDestination name
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className='relative flex h-60 w-full max-w-54 flex-col justify-center rounded-lg bg-white shadow-lg'>
      <div
        className='absolute top-2 right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-lightgrey'
        onClick={() => alert('Report subdestination will be implemented soon!')}
      >
        <MdReportProblem className='pl-0.5 text-2xl text-secondary' />
      </div>
      <div
        className='w-full flex-2 rounded-t-lg bg-cover bg-center'
        style={{backgroundImage: `url(${subDestination.file_url})`}}
      ></div>

      <div className='flex flex-col items-center justify-center gap-1 p-2'>
        <h3 className='text-h3 font-bold text-secondary'>
          {capitalize(subDestination.name)}
        </h3>
        {/* <p className='text-sm'>{subDestination.rating}</p> */}
        <Rating
          style={{maxWidth: 150}}
          value={subDestination.rating}
          itemStyles={{
            itemShapes: ThinRoundedStar,
            activeFillColor: '#f5b942',
            activeStrokeColor: '#1a2e40',
            inactiveFillColor: '#1a2e40',
          }}
          readOnly
        />
      </div>
    </div>
  );
};

export default SubDestCard;
