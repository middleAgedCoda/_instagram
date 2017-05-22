import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ProtectedRoute } from '../../util/route_util';

import Navigation from '../navigation/navigation_container';
import UserEditContainer from './user_edit_container';
import PostItem from '../post/post_item';

class UserProfile extends React.Component {
  constructor(props){
    super(props);
    this.editProfile = this.editProfile.bind(this);

  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname){
    this.props.fetchUser(nextProps.match.params.userId);
    }
  }
  editProfile() {
    if(this.props.currentUser.id === this.props.user.id) {
      return (
        <Link to={`${this.props.user.id}/edit`}>
          <button className="profile-header-right-1-edit-button">
            Edit Profile
          </button>
        </Link>
      );
    }
  }


  render() {
    return(
      <div>
        <Navigation />
        <article className="profile-page">
          <header className="profile-header">
            <div className="profile-header-left">
              <img src={this.props.user.profile_pic_url} />
            </div>
            <div className="profile-header-right">
              <div className="profile-header-right-1">
                <h1>{this.props.user.username}</h1>
                {this.editProfile()}
              </div>
              <ul className="profile-header-right-2">
                <li> <h3>{this.props.user.posts_count}</h3>posts</li>
                <li> <h3>{this.props.user.followers_count}</h3>follows</li>
                <li> <h3>{this.props.user.followings_count}</h3>following</li>
              </ul>
              <div className="profile-header-right-3">
                <h3>{this.props.user.name}</h3>
                {this.props.user.bio}
              </div>
            </div>
          </header>
          <div className="post-item-frame">
            <ul className="post-item-ul">
              {
                this.props.user.id ? this.props.user.posts.map((post) => (
                    <li key={`post-item-${post.id}`}>
                      <PostItem post={post} user={this.props.user}/>
                    </li>
                  )
                )
                : ""
              }
            </ul>
          </div>
        </article>
        <ProtectedRoute path={'/:userId/post/:postId'} component={PostItem} />
      </div>
    );
  }
}

export default UserProfile;
