import React ,{useState} from "react";
import { useAppDispatch } from "../../../App/Hooks/Hooks";
import Json from "../../../assets/gym.json";
// import {getExercisesByMuscle} from "../../../App/Action/Action";

interface Props {
    section: {
        id: string;
        name: string;
    };
}

const MuclesFilters = ({section}:Props) => {

    const data = Json[0].exercises;

    const dispatch = useAppDispatch()

    const  [muscle, setMuscle] = useState<string>("");

    const handleSelect = (e:any) => {
        e.preventDefault();
        console.log(e.target.value);
        setMuscle(e.target.value);
        // dispatch(getExercisesByMuscle(muscle))
    }

    return (
        <div>
            {
                data.map(
                    (
                        option,
                        optionIdx
                    ) => (
                        <div
                            key={
                                option.id
                            }
                            className="flex items-center"
                        >
                            <input
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                onClick={handleSelect}
                                defaultValue={
                                    option.muscle
                                }
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600"
                            >
                                {
                                    option.muscle
                                }
                            </label>
                        </div>
                    )
                )
            }
        </div>
    );
};

export default MuclesFilters;