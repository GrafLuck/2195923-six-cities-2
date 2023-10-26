import { PreviewOffer } from '../../types/offer';
import {useState} from 'react';
import PlaceCard from '../place-card/place-card';
import { PlaceCardType } from '../../data';

type PlaceCardListProps = {
  offers: PreviewOffer[];
}

function PlaceCardList({offers} : PlaceCardListProps) {
  const [activeCard, setActiveCard] = useState('');

  const handlePlaceCardMouseOver = (evt : React.MouseEvent) => {
    console.log(evt.currentTarget);
  };

  function getPlaceCards(offersArray: PreviewOffer[]) {
    return Array.from({length: offers.length}, (_, index : number) => <PlaceCard offer={offersArray[index]} type={PlaceCardType.City} key={offersArray[index].id}/>);
  }

  return (
    <div className="cities__places-list places__list tabs__content" onMouseOver={handlePlaceCardMouseOver}>
      {getPlaceCards(offers)}
    </div>
  );
}

export default PlaceCardList;
