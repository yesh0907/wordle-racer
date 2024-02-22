function genUUID(length: number) {
    const genAlphanumericUUID = () => {
        // Create an array of all alphanumeric characters
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

        // Generate a random number between 0 and the length of the characters array
        const randomIndex = Math.floor(Math.random() * characters.length);

        // Get the character at the random index
        const character = characters[randomIndex];

        // Return the character
        return character;
    }

    const uuid: string[] = [];
    for (let i = 0; i < length; i++) {
        uuid.push(genAlphanumericUUID());
    }

    return uuid.join("");
}

export function genGameId() {
    return genUUID(4);
}

export function genPlayerId() {
    return genUUID(6);
}