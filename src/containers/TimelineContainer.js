import { connect } from 'react-redux';
import Timeline from '../components/Timeline';
import { setDateActive } from '../redux/actions';

const mapStateToProps = state => ({
  activeDate: state.activeDate,
  events: state.eventData,
  rainData: state.rainData,
  startDate: state.today,
});

const mapDispatchToProps = dispatch => ({
  setDateActive: date => dispatch(setDateActive(date)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
