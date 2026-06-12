

export class Workout{
    data: WorkoutData

    constructor(id: string){
        this.data = {
            id: id,
            date: new Date(),
            exercises: [],
            main_muscle_groups: [],
            notes: ""
        }
    }

    getData(){
        return this.data
    }

}

export type WorkoutData = {
    id: string;
    date: Date;
    exercises: Array<Exercise>;
    main_muscle_groups: Array<{name: string}>;
    notes: string;
}

export type Exercise = {
    id: string
    exercise_type: ExerciseType | null;
    details: Array<ExerciseDetail>
}

export type ExerciseType = {
    id: string;
    name: string;
    image: string;
    muscle_group: string;
}

export type ExerciseDetail ={
    id: string,
    sets: number,
    reps: number,
    weight: number
}

export type MuscleGroup = {
    name: string;
}
