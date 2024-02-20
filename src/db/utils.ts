import { QueryDocumentSnapshot } from "firebase/firestore";

export interface IGame {
    word: string;
    player1?: {
        id: string;
        progress: number;
    };
    player2?: {
        id: string;
        progress: number;
    }
};

export const GameConverter = {
    toFirestore: (game: IGame) => (game),
    fromFirestore: (snap: QueryDocumentSnapshot) => (snap.data() as IGame),
};
