import CardOptionModel from "./CardOptionModel"

interface CardModel {
    id: string,
    order: number,
    question: string,
    cardOptions: CardOptionModel[]
}

export default CardModel