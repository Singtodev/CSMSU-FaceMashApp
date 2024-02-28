export interface Picture {
    pid?:        number;
    url?:        string;
    name?:       string;
    vote_count?: number;
    update_at?:  Date;
    create_at?:  Date;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toPicture(json: string): Picture[] {
        return JSON.parse(json);
    }

    public static pictureToJson(value: Picture[]): string {
        return JSON.stringify(value);
    }
}
