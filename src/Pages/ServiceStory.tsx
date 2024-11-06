import { StoryForm } from '@/Components/Forms/StoryForm';
import { ModalBtn } from '@/Components/ModalBtn/ModalBtn';
import { SingleStory } from '@/Components/SingleStory/SingleStory'
import { useGetServiceStoriesQuery } from '@/Redux/api';
import { useOutletContext } from 'react-router-dom';

export const ServiceStory = () => {
  const serviceId = useOutletContext<string | null>();  // Specify type as string | null
  const { data: Service, error: serviceError, isLoading: ServiceLoading } = useGetServiceStoriesQuery(serviceId ?? "", {
    skip: !serviceId,
  });
  return (
  <div className='px-5'>
    <h2 className='text-fontColor font-semibold text-4xl mb-3'>القصص</h2>
    <div className=' flex justify-center items-center flex-wrap gap-8'>
      <SingleStory />
      <ModalBtn
          text="اضافه قصه "
          formData={<StoryForm data={null} />}
        />
    </div >
  </div>
  )
}
