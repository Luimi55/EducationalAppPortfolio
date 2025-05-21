import CardModel from "./CardModel"

interface DeckModel {
    id: string,
    title: string,
    cards: CardModel[]
}

export default DeckModel