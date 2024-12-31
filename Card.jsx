import Icon from "../Icon/Icon";
import './Card.css'

function Card({ iconname }) {
    return (
        <div className="card">
            <Icon name={iconname}></Icon>
        </div>
    )
}

export default Card;