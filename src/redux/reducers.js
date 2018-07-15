import { subDays, isSameDay } from 'date-fns';


const today = new Date('2018-07-12T08:00:00.000Z');

const eventData = [...Array(50).keys()].filter((idx) => idx === 0 || Math.random() > .15).map(idx => {
	const datum = subDays(today, idx);
	const dateString = datum.toLocaleDateString('en-US', {month:  'numeric', day: 'numeric'});
  const cloudiness = Math.random() / 2;

  return {
    x: datum,
    y: 1.25,
    active: isSameDay(today, datum),
    icon: cloudiness > .3 ? 'cloud' : 'circle',
		label: `${dateString}\n ${Math.ceil(cloudiness * 100)}% cloud cover`,
    thumb: {
      href: 'https://via.placeholder.com/100x100',
      height: 100,
      width: 100,
    }
  };
});

const rainData = [...Array(50).keys()].filter(() => Math.random() > .5).map(idx => {
  const datum = subDays(today, idx);
  const precip = Math.ceil(Math.random()*3);
  return {
    x: datum,
    y: precip/3,
    label: `${precip} inches`
  };
});

const timeline = (state = {activeDate: today, today, rainData, eventData}, action) => {
  switch (action.type) {
    case 'SET_ACTIVE':
      return {
        ...state,
        activeDate: action.date,
        eventData: eventData.map(event => {
          if (isSameDay(action.date, event.x)) {
            event.active = true
          } else {
            event.active = false
          }
          return event
        })
      }
    default:
      return state
  }
}

export default timeline;
