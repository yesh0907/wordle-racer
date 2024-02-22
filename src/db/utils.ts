import { QueryDocumentSnapshot } from "firebase/firestore";

export interface IGame {
    word: string;
    progress: {
        [playerId: string]: number;
    },
    playerIds: {[id: string]: {claimed: boolean}}[],
};

export const GameConverter = {
    toFirestore: (game: IGame) => (game),
    fromFirestore: (snap: QueryDocumentSnapshot) => (snap.data() as IGame),
};
