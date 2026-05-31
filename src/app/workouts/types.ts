

export class Workout{
    data: WorkoutData

    constructor(id: string){
        this.data = {
            id: id,
            date: Date.now(),
            exercizes: [],
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
    date: number;
    exercizes: Array<Exercize>;
    main_muscle_groups: Array<string>;
    notes: string;
}

export type Exercize = {
    excercise_type: ExercizeType;
    details: Array<{
        id: string;
        sets: number;
        reps: number;
        weight: number;
    }>
}

export type ExercizeType = {
    name: string;
    image: string;
    muscle_group: string;
}

export enum MuscleGroup {
    back = "Back",
    chest = "Chest",
    arm = "Arm",
    shoulder = "Shoulder",
    leg = "Leg",
    belly= "Belly",
    default = ""
}
