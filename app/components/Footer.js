import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <p>Powered by <strong>Node.js</strong>, <strong>MongoDB</strong> and <strong>React</strong> with Flux architecture and server-side rendering.</p>
                            <p><strong>Open Source</strong> code available at Github</p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
