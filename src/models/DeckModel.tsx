import CardModel from "./CardModel"

interface DeckModel {
    image?: String,
    id: string,
    title: string,
    cards: CardModel[]
}

export default DeckModel