interface ServiceData {
    service: {
        data: any;
    };
    is_active: boolean;
}
interface ServicesProps {
    data: ServiceData;
}
export declare const Services: React.FC<ServicesProps>;
export {};
