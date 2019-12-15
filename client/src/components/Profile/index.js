import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getCurrentProfile} from "../../redux/actions/profile";
import Header from "../Header";
import NewProfile from "./NewProfile/";
import ExistingProfile from "./ExistingProfile/";
const Profile = ({
  getCurrentProfile,
  auth: {user},
  profile: {profile, loading},
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <h1>Loader</h1>
  ) : (
    <div>
      <Header subtitle="Show yourself in your profile" profile />
      {profile !== null ? <ExistingProfile /> : <NewProfile />}
    </div>
  );
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {getCurrentProfile})(Profile);
