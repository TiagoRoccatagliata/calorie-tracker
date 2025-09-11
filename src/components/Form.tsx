import { useState } from "react"
import type { ChangeEvent } from "react"
import type { Activity } from "../types"
import type { Dispatch } from "react"
import type { FormEvent } from "react"
import { categories } from "../data/categories"
import type { ActivityActions } from "../reducers/activity-reducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>
}

export default function Form({dispatch} : FormProps) {
  
    const [activity, setActivity] = useState<Activity>({
        category: 1,
        name: '',
        calories: 0 // Usamos el State como un Objeto.
    })


    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id) // si el id de lo que llenamos es alguno de esos dos sabemos que viene un numero

        console.log(isNumberField)
        setActivity({
            ...activity, // esto mantiene el state previo con ...
            [e.target.id]: isNumberField ? +e.target.value : e.target.value // si es un numero lo convierte con el + y si no lo deja como esta
        })

    }

    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({ type: "save-activity", payload: {newActivity: activity}})
    }

  
    return (
    <form 
    className="space-y-5 bg-white shadow p-10 rounded-lg"
    onSubmit={handleSubmit}
    >

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Categoría:</label>
            <select className="border border-slate-300 p-2 
                rounded-lg w-full bg-white" 
                id="category"
                value={activity.category}
                onChange={handleChange}
                >
                {categories.map(category => (
                    <option 
                    key={category.id} 
                    value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="activity">Actividad:</label>
            <input
             id="name"
             type="text"
             className="border border-slate-300 p-2 rounded-lg"
             placeholder="Ej. Comida: Jugo de naranja"
             value={activity.name}
             onChange={handleChange}
            />
        </div>  


        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories">Calorias:</label>
            <input
             id="calories"
             type="number"
             className="border border-slate-300 p-2 rounded-lg"
             placeholder="Ej. Calorias: 300 o 500"
             value={activity.calories}
             onChange={handleChange}
            />
        </div>

        <input type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white
        cursor-pointer disabled:opacity-10"
        value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio' }
        disabled={!isValidActivity()}
        />

    </form>
  )
}
