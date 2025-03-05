import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarIcon, ClockIcon } from "lucide-react";
import ElectricUnitFilter from "../filters/unit-energy-filter";


interface Readings {
    count: number;
    next: string | null;
    previous: string | null;
    results: Reading[];
  }
  
  interface Reading {
    created_at: string;
    device: Device;
    indicators: Indicators;
  }
  
  interface Device {
    id: number;
    name: string;
    dev_eui: string;
  }
  
  interface Indicators {
    id: number;
    values_per_channel: ValuePerChannel[];
    measurement_point_name: string;
  }
  
  interface ValuePerChannel {
    values: Values;
    channel: number;
  }
  
  type Values = Record<string, number>


  export default function MeasurementTable({ readings }: { readings: Readings }) {

    // const indicatorsHeaders = Object.keys(readings.results[0].indicators.values_per_channel[0].values)
    const indicatorsObject = readings.results[0].indicators.values_per_channel[0].values

    const avaibleIndicators = [] as Array<string>

    for (const key in indicatorsObject) {
       if (indicatorsObject[key] !== null) {
        avaibleIndicators.push(key)
       } 
      }

    const formatDateTime = (dateTimeString: string) => {
        const date = new Date(dateTimeString)
      
        // Formatear la fecha como "Jueves, 12 de noviembre"
        const options: Intl.DateTimeFormatOptions = {
          weekday: "long",
          day: "numeric",
          month: "long"
        }
        let formattedDate = date.toLocaleDateString("es-ES", options)
      
        // Capitalizar la primera letra en caso de que no lo esté
        formattedDate =
          formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
      
        // Formatear la hora como HH:MM
        const hours = date.getHours().toString().padStart(2, "0")
        const minutes = date.getMinutes().toString().padStart(2, "0")
        const formattedTime = `${hours}:${minutes}`
      
        return { date: formattedDate, time: formattedTime }
      }
  
    return (
      <Card className="max-w-[450px]">
        <CardHeader>
            <ElectricUnitFilter/>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      Fecha
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4" />
                      Hora
                    </div>
                  </TableHead>
                  {avaibleIndicators.map((indicator, index) => (
                    <TableHead key={index}>{indicator}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {readings.results.map((reading, readingIndex) => {
                  const { date, time } = formatDateTime(reading.created_at)
  
                  // Obtenemos los valores de los indicadores para este reading
                  const indicatorValues = reading.indicators.values_per_channel[0].values
  
                  return (
                    <TableRow key={readingIndex}>
                      <TableCell className="text-nowrap">{date}</TableCell>
                      <TableCell>{time}</TableCell>
                      {avaibleIndicators.map((header, headerIndex) => (
                        <TableCell key={headerIndex}>{indicatorValues[header]}</TableCell>
                      ))}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    )
  }
