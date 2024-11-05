import { useOutletContext } from 'react-router-dom';
import { SubServicesTable } from '../Components/Tables/SubServicesTable';
import { useGetSingleServiceQuery } from '@/Redux/api';
export const SubServices = () => {
    const serviceId = useOutletContext<string | null>();  // Specify type as string | null
    const { data: Servic, error: serviceError, isLoading: ServiceLoading } = useGetSingleServiceQuery(serviceId ?? "", {
        skip: !serviceId,
    });
    return (
        <>
            <h2 className='text-fontColor text-4xl font-semibold'>خدمات فرعيه</h2>


            {/* {ServiceLoading ? <div>loading.....</div> : <SubServicesTable data={Servic?.data?.sub_service_id} />} */}
            {serviceError && <div>error.....</div>}
        </>
    )
}
