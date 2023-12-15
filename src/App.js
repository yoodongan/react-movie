import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";

const App = () => {
    return (
            <Router>
                <Switch>
                    <Route path="/hello-world">
                        <h2>Hello World!</h2>
                    </Route>
                    <Route path="/movie/:movieId">
                        <Detail />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
    )
}

export default App;
