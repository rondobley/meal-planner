import React from 'react';
import { Link } from 'react-router';

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <p>Powered by <strong>Node.js</strong>, <strong>MongoDB</strong> and <strong>React</strong> with Flux architecture and server-side rendering.</p>
                            <p><strong>Open Source</strong> code available at <a href="https://github.com/rondobley/meal-planner">Github</a></p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
