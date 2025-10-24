import { createContext, useMemo, useReducer, type Dispatch, type ReactNode } from "react";
import { activityReducer, initialState, type ActivityActions, type ActivityState } from "../reducers/activity-reducer";
import { categories } from "../data/categories";
import type { Activity } from "../types";

type ActivityProviderProps = {
    children: ReactNode
}

type ActivityContextProps = {
    state: ActivityState
    dispatch: Dispatch<ActivityActions>
    caloriesConsumed: number
    caloriesBurn: number
    netCalorie: number
    categoryName: (category: Activity["category"]) => string[]
    isEmptyActivities: boolean

}

export const ActivityContext = createContext<ActivityContextProps>(null!)

export const ActivityProvider = ({ children }: ActivityProviderProps) => {

    const [state, dispatch] = useReducer(activityReducer, initialState)

    // contadores
    const caloriesConsumed = useMemo(() => state.activities.reduce((total, activity) => activity.category === 1 ?
        total + activity.calories : total, 0), [state.activities])

    const caloriesBurn = useMemo(() => state.activities.reduce((total, activity) => activity.category === 2 ?
        total + activity.calories : total, 0), [state.activities])

    const netCalorie = useMemo(() => caloriesConsumed - caloriesBurn, [state.activities])


    const categoryName = useMemo(() =>
        (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : '')
        , [state.activities])

    const isEmptyActivities = useMemo(() => state.activities.length === 0, [state.activities])


    return (
        <ActivityContext.Provider value={{
            state,
            dispatch,
            caloriesConsumed,
            caloriesBurn,
            netCalorie,
            categoryName,
            isEmptyActivities
        }} >
            {children}
        </ActivityContext.Provider>
    )
}