import { useEffect, useState } from 'react'

export default function DisplayCards(props) {

    const allVillagers = props.villagers.map((villager,i) => {
        return (
            <li key={`vil${i}`}>
                <img 
                    src={villager.image_uri} 
                    alt={villager.name['name-USen']} 
                    onClick={props.handleClick ? () => props.handleClick(villager) : () => {}}
            />                
            <p>{villager.name['name-USen']}</p>
            </li>
        )
    })

    return (
        <div>
            <ul>{allVillagers}</ul>
        </div>
    )
}