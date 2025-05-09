import { getCompanyData } from "@/app/lib/auth";
import { current, voltage } from "@/app/sevices/energy/desbalance/data";
import { getEnergyCompanyDetails } from "@/app/sevices/energy/enterprise/data";
import { SearchParams } from "@/app/type";
import AlertTable from "@/app/ui/energia/desbalance/alerta/alerts-table";
import HeadquarterEnergyFilter from "@/app/ui/energia/filters/headquarter-energy-filter";
import PanelsFilterEnergy from "@/app/ui/energia/filters/panels-energy-filter";
import { DatepickerRange } from "@/app/ui/filters/datepicker-range";
import FiltersContainer from "@/app/ui/filters/filters-container";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function page({ searchParams } : SearchParams) {

const { companies } = await getCompanyData()

const { headquarter = '1' , panel = '1',  date_after = new Date(), date_before = new Date(), metric = 'current', page = '1'} = await searchParams

const energyDetails = await getEnergyCompanyDetails({ headquarterId: companies[0].id })

const currentReadings = await current({
  headquarterId: headquarter,
  panelId: panel,
  date_after: format(date_after, "yyyy-MM-dd"),
  date_before: format(date_before, "yyyy-MM-dd"),
  page
})

  const voltageReadings = await voltage({
    headquarterId: headquarter,
    panelId: panel,
    date_after: format(date_after, "yyyy-MM-dd"),
    date_before: format(date_before, "yyyy-MM-dd"),
    page
  })

return (
<div>
    <FiltersContainer>
        <Link href={'/energia/dashboard/desbalance'}
          className="bg-[#00b0c7] rounded-lg absolute top-1/2 left-6 p-2
            transform -translate-y-1/2 cursor-pointer text-white hover:bg-gray-100 hover:text-black"
        >
          <ArrowLeft className="h-4 w-4 "/>
        </Link>
        <HeadquarterEnergyFilter energyHeadquarter={energyDetails.energy_headquarters} />
        <PanelsFilterEnergy energyPanels={energyDetails.energy_headquarters[0].electrical_panels} />
        <DatepickerRange />
    </FiltersContainer>
    <AlertTable readings={metric === 'current' ?  currentReadings :  voltageReadings} metric={metric}/>
</div>
    
  )
}
