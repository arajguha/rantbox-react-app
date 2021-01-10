import React from 'react'

const style = {
    backgroundColor: "#00695c",
    borderTop: "1px solid #E7E7E7",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
    color: 'white'
}

const phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
}

const Footer = (props) => {
    return (
        <div>
            <div style={phantom} />
            <div style={style}>
                <div className="footer-copyright">
                    <div className="container">
                        <div className="row">
                            <div className="col s4">
                                <strong>View on Github</strong>
                            </div>
                            <div className="col s4">
                                <a className="grey-text text-lighten-4 center" 
                                    href="https://github.com/arajguha/rantbox-react-app" 
                                    target="_blank"
                                >Front End</a>
                            </div>
                            <div className="col s4">
                                <a 
                                    className="grey-text text-lighten-4 center"
                                     href="https://github.com/arajguha/rant_box" 
                                     target="_blank"
                                >Back End</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
