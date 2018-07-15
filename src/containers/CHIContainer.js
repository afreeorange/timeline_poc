import { connect } from 'react-redux';
import CHIMap from '../components/CHIMap';


const mapStateToProps = state => ({
  activeDate: state.activeDate,
});

export default connect(mapStateToProps)(CHIMap);
