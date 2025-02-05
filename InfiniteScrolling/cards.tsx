import React from 'react';

export type Card= {
    name: string,
    image: string,
    description: string
}

type CardType={
    card:Card
}

const Cards:React.FC<CardType>=({card})=>{
    return <>
        <img src={card.image} width={50} height={50}/>
        <h4>{card.name}</h4>
        <p>{card.description}</p>
    </>
};

export default Cards