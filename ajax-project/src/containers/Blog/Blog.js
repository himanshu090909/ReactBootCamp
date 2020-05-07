import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from './FullPost/Fullpost';
//import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/AsyncComponent';
import classes from './blog.module.css';
import Posts from './Posts/Posts';
const AsyncNewPost= asyncComponent(()=>{
    return import('./NewPost/NewPost');
});
class Blog extends Component {
    state={
        auth:true
    }

    render () {

       
        return (
            <div>
                <header className={classes.Blog}>
                    <nav>
                        <ul>

                            <li><NavLink to="/posts/">Posts</NavLink></li>
                          
                            <li><NavLink to="/new-post">New Post</NavLink></li>
                           

                        </ul>
                    </nav>
                </header>
               
                {/* <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section> */}
{/* 
              <Route path="/" exact render={()=><h1>Home</h1>}/> */}
            <Switch>
            {this.state.auth ? <Route path="/new-post"  component={AsyncNewPost}/>:null}
            <Route path="/posts" component={Posts}/>
            <Route render ={()=><h1>not found</h1>}/>
            {/* <Redirect from="/" to="/posts"/>
             */}
            </Switch>
            </div>
        );
    }
}

export default Blog;