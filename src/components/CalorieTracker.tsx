import { useMemo } from "react"
import type { Activity } from "../types"
import CalorieDisplay  from "../components/CalorieDisplay"

type CalorieTrackerProps = {
 activities: Activity[]
}

export default function CalorieTracker({activities} : CalorieTrackerProps) {
  
  //contadores
  const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? 
  total + activity.calories : total, 0) , [activities])

  const caloriesBurn = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? 
  total + activity.calories : total, 0) , [activities])

  const netCalorie = useMemo(() => caloriesConsumed - caloriesBurn , [activities])
  
  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">Resumen de Calorias</h2>
    
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay 
          calories={caloriesConsumed}
          text="Consumidas"
        />
        <CalorieDisplay 
          calories={caloriesBurn}
          text="Ejercicio"
        />
        <CalorieDisplay 
          calories={netCalorie}
          text="Diferencia"
        />
      </div>
      
    </>
  )
}
