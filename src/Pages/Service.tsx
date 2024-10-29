import { CharInfo } from '@/Components/ChartData/CharInfo'

export const Service = () => {
    const chartData = [
        { month: "January", desktop: 150, label: "الصفحه الرئيسيه" },
        { month: "February", desktop: 305, label: "العروض" },
        { month: "March", desktop: 237, label: "المنتجات" },
        { month: "April", desktop: 73, label: "الاعلانات" },
        { month: "May", desktop: 209, label: "المنشورات" },
        { month: "June", desktop: 214, label: "القصص" }
      ];
    const data = [
        { month: "January", desktop: 150, label: " عدد الاعلانات" },
        { month: "February", desktop: 305, label: "عدد القصص" },
        { month: "March", desktop: 237, label: "المنتجات" },
        { month: "April", desktop: 73, label: "عدد الخدمات الفرقعيه" },
        { month: "May", desktop: 209, label: "عدد العروض" },
        { month: "June", desktop: 214, label: "عدد المنشورات" }
      ];
  return (
    <div>
            <h2 className="text-primaryColor text-2xl font-semibold px-5">الاحصائيات</h2>

        <CharInfo chartData={chartData} text={'زيارات'}/>
        <CharInfo chartData={data} text='الاعداد'/>
    </div>
  )
}
