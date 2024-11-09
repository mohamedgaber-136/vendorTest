import { StoryForm } from '@/Components/Forms/StoryForm';
import { Loader } from '@/Components/Loader/Loader';
import { ModalBtn } from '@/Components/ModalBtn/ModalBtn';
import { SingleStory } from '@/Components/SingleStory/SingleStory';
import { useGetServiceStoriesQuery } from '@/Redux/api';
import { useOutletContext } from 'react-router-dom';

interface ServiceStoryData {
  id: string;
  title: string;
  content: string;
  // Add other properties based on the structure of the story data
}

export const ServiceStory = () => {
  const serviceId = useOutletContext<string | null>();  // Specify type as string | null
  
  const { data: Service, error: serviceError, isLoading: ServiceLoading } = useGetServiceStoriesQuery(serviceId ?? "", {
    skip: !serviceId,
  });

  // Check if Service has a 'data' field, handle errors if necessary
  if (serviceError) {
    return <div>Error loading stories: {serviceError.message}</div>;
  }


  return (
    <div className='px-5'>
      <h2 className='text-fontColor font-semibold text-4xl mb-3'>القصص</h2>
      <div className='flex justify-center items-center flex-wrap gap-8'>
        {
          ServiceLoading ? <Loader /> :
          Service?.data?.map((item: ServiceStoryData) => (
            <SingleStory key={item.id} item={item} />
          ))
        }

        <ModalBtn
          text="اضافه قصه "
          formData={<StoryForm data={null} />}
        />
      </div>
    </div>
  );
};
