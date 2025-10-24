import CalorieDisplay from "../components/CalorieDisplay"
import { useActivity } from "../hooks/useActivity"

export default function CalorieTracker() {

  const { caloriesBurn, caloriesConsumed, netCalorie } = useActivity()


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
