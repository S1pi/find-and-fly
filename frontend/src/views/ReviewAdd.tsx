import Header from '../components/Header';

// Hard coded categorylist for now
const categoryList = [
  {id: 1, name: 'City'},
  {id: 2, name: 'Capital'},
  {id: 3, name: 'Metropolitan'},
  {id: 4, name: 'historic'},
  {id: 5, name: 'Mountain'},
  {id: 6, name: 'Beach'},
  {id: 7, name: 'Mountain'},
  {id: 8, name: 'countryside'},
  {id: 9, name: 'other'},
];

const ReviewAdd = () => {
  return (
    <>
      <Header />
      <div className='h-screen bg-lightblue'>
        <h1>Create Destination First</h1>

        <div className='flex h-4/5 items-center justify-center gap-10'>
          <div className='flex flex-col items-center'>
            <h3>INFORMATION: </h3>
            <form className='flex flex-col gap-4'>
              <input
                type='text'
                placeholder='Destination'
                className='rounded-md border-2 border-primary'
              />
              <input
                type='text'
                placeholder='Country'
                className='rounded-md border-2 border-primary'
              />
              <textarea
                placeholder='Description'
                className='rounded-md border-2 border-primary'
                rows={5}
              />
              {/* Category selection for destination */}
              <div className='flex flex-col'>
                <label htmlFor='category'>Category: </label>
                <select
                  name='category'
                  id='category'
                  className='rounded-md border-2 border-primary'
                >
                  <option value=''>--Please choose an option--</option>
                  {categoryList.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <button className='rounded-md bg-primary px-4 py-2 text-lightblue'>
                Add Destination
              </button>
            </form>
          </div>
          {/* Picture Upload For it */}
          <div>
            <img
              src='https://via.placeholder.com/150'
              alt='placeholder'
              className='rounded-md'
            />
            <input type='file' />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewAdd;
