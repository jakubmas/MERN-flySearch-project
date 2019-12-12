import React, {Fragment, useState, useEffect} from "react";
import {Link, withRouter} from "react-router-dom";
import Input from "../../Input";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createProfile, getCurrentProfile} from "../../../redux/actions/profile";
import Alert from "../../Alert";

const EditProfile = ({
  profile: {profile, loading},
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    website: "",
    location: "",
    status: "",
    skills: "",
    bio: "",
    youtube: "",
    twitter: "",
    facebook: "",
    instagram: "",
    options: [],
  });

  useEffect(() => {
    if (profile !== null) {
      getCurrentProfile();
      setFormData({
        website: loading || !profile.website ? "" : profile.website,
        location: loading || !profile.location ? "" : profile.location,
        status: loading || !profile.status ? "" : profile.status,
        skills: loading || !profile.skills ? "" : profile.skills,
        bio: loading || !profile.bio ? "" : profile.bio,
        youtube: loading || !profile.social ? "" : profile.social.youtube,
        twitter: loading || !profile.social ? "" : profile.social.twitter,
        facebook: loading || !profile.social ? "" : profile.social.facebook,
        instagram: loading || !profile.social ? "" : profile.social.instagram,
        options: [
          "Planning Phase",
          "Currently Travelling",
          "Returning home",
          "No, I'm at home",
          "Other",
        ],
      });
    }
  }, [loading, getCurrentProfile]);

  const {
    website,
    location,
    status,
    skills,
    bio,
    youtube,
    twitter,
    facebook,
    instagram,
    options,
  } = formData;

  const onChange = e =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <div className="profile--update--container">
      <div className="profile--update--main">
        <div className="profile__form">
          <div className="alert--container">
            <Alert />
          </div>
          <h1 className="profile__form--title">Create Your Profile</h1>
          <form className="form" autoComplete="off" onSubmit={e => onSubmit(e)}>
            <div className="profile__form--flex">
              <div className="profile__form--flex--content--1">
                <div className="form-group__dropdown">
                  <p className="form-text__dropdown">
                    Give us an idea about your status
                  </p>
                  <div className="form-group__select">
                    <select
                      name="status"
                      value={status}
                      onChange={e => onChange(e)}
                    >
                      {options.map(option => {
                        return <option value={option}>{option}</option>;
                      })}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <Input
                    value={website}
                    onChangeHandler={onChange}
                    type="text"
                    name="website"
                    placeholder="Share your website/blog to know you better"
                    id="website-profile"
                    htmlFor="website-profile"
                  />
                </div>
                <div className="form-group">
                  <Input
                    value={location}
                    onChangeHandler={onChange}
                    type="text"
                    name="location"
                    placeholder="Where do you live? Where are you?"
                    id="location-profile"
                    htmlFor="location-profile"
                  />
                </div>
                <div className="form-group">
                  <p className="form-text__p">
                    Please use comma separated values (eg. English, Survival,
                    Communication, Stress management)
                  </p>
                  <Input
                    value={skills}
                    onChangeHandler={onChange}
                    type="text"
                    name="skills"
                    placeholder="Skills"
                    id="skills-profile"
                    htmlFor="skills-profile"
                  />
                </div>
                <div className="form-group">
                  <p className="form-text__p">
                    Tell us a little about yourself
                  </p>
                  <textarea
                    placeholder="A short bio of yourself"
                    name="bio"
                    value={bio}
                    onChange={e => onChange(e)}
                  ></textarea>
                </div>
              </div>
              <div className="profile__form--flex--content--2">
                <Fragment>
                  <div className="form-group social-input">
                    <i className="fab fa-twitter fa-4x"></i>
                    <div className="social--input--container">
                      <Input
                        value={twitter}
                        onChangeHandler={onChange}
                        type="text"
                        name="twitter"
                        placeholder="Twitter"
                        id="twitter-profile"
                        htmlFor="twitter-profile"
                      />
                    </div>
                  </div>

                  <div className="form-group social-input">
                    <i className="fab fa-facebook fa-4x"></i>
                    <div className="social--input--container">
                      <Input
                        value={facebook}
                        onChangeHandler={onChange}
                        type="text"
                        name="facebook"
                        placeholder="Facebook"
                        id="facebook-profile"
                        htmlFor="facebook-profile"
                      />
                    </div>
                  </div>

                  <div className="form-group social-input">
                    <i className="fab fa-youtube fa-4x"></i>
                    <div className="social--input--container">
                      <Input
                        value={youtube}
                        onChangeHandler={onChange}
                        type="text"
                        name="youtube"
                        placeholder="YouTube"
                        id="youtube-profile"
                        htmlFor="youtube-profile"
                      />
                    </div>
                  </div>

                  <div className="form-group social-input">
                    <i className="fab fa-instagram fa-4x"></i>
                    <div className="social--input--container">
                      <Input
                        value={instagram}
                        onChangeHandler={onChange}
                        type="text"
                        name="instagram"
                        placeholder="Instagram"
                        id="instagram-profile"
                        htmlFor="instagram-profile"
                      />
                    </div>
                  </div>
                </Fragment>
                <div className="buttons--container">
                  <input type="submit" className="btn--small" value="Submit" />
                  <Link className="btn--small" to="/profile">
                    Back
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(
  withRouter(EditProfile),
);
