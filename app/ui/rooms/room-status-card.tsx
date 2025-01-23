'use client'
import { Status } from "@/app/type"
import { STATUS_COLOR, STATUS_TO_SPANISH } from "@/app/utils/formatter"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from 'next/navigation'

type Props = {
    name: string,
    status: string,
    isActivated: boolean,
    room: number,
    devEUI: string,
    headquarter: string
}

export default function RoomStatusCard(
  {
    name,
    status,
    isActivated,
    room,
    devEUI,
    headquarter
  } : Props
) {

  const pathname = usePathname()

  return (
    <Card className="max-w-xs shadow-lg">
      <CardContent className="p-6"> 
        {/* Top Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Image src='https://utfs.io/f/y8yAFIxNrCH6xltOgtMQNWRFGe0pAcYU5bZ6nSwJOCPqIh4g' alt="face" width={64} height={64} className="object-fit"/>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold capitalize block text-balance text-right">{ name }</span>
            <span className={`text-sm text-right font-semibold block ${STATUS_COLOR[status as Status]}`}>{ STATUS_TO_SPANISH[status as Status] }</span>
          </div>
        </div>

        {/* Middle Section */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Sensor:</span>
            <span className="text-sm">{ devEUI ? devEUI : 'No disponible' }</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Estado:</span>
            <div className="flex items-center gap-2">
              <p className="text-sm">{isActivated ? 'Conectado' : 'Desconectado'}</p>
              {/* { isActivated ? <div className={styles.blinkingcircleGreen}/> : <div className={styles.blinkingcircleRed}/>} */}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-sm text-muted-foreground mb-4">
          { headquarter }
        </div>
      </CardContent>
      <CardFooter>
        <Link 
          className="w-full"
          href={`${pathname}/monitoreo?room=${room}`}
          >
          <Button className="w-full" >  
              Ir a detalles de la sala
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

