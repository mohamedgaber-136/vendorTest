import { FC } from "react";
import { ServiceForm } from "@/Components/Forms/ServiceForm";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";

export const EditService: FC = () => {
    const { data } = useSelector((state: RootState) => state.service);

    return (
        <div className="md:w-1/2 p-5 sm:w-full">
            <h2 className="text-fontColor text-4xl font-semibold mb-5">
                بيانات الخدمه
            </h2>
            <ServiceForm data={data} type="update" />
        </div>
    );
};
