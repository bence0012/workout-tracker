

export class Workout{
    data: WorkoutData

    constructor(id: string){
        this.data = {
            id: id,
            date: Date.now(),
            exersizes: [],
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
    exersizes: Array<Exersize>;
    main_muscle_groups: Array<string>;
    notes: string;
}

export type Exersize = {
    excercise_type: ExersizeType;
    details: Array<{
        id: string;
        sets: number;
        reps: number;
        weight: number;
    }>
}

export type ExersizeType = {
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
