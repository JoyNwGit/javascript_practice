import React from 'react'
import { BrowserRouter as BRouter, Switch, Route } from 'react-router-dom'

import App from "../App";
import Recipe from "./Recipe"

/// Basically a url handler between the 2 pages, home page and a indiv recipe page
const Router = () => {
    return (
        <BRouter>
            <Switch>
                <Route path="/" exact component={App}/>
                <Route path="/recipe/:id" component={Recipe}/>
            </Switch>
        </BRouter>
    )
}

export default Router