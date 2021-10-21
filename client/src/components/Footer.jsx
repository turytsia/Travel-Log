import React from 'react'
import { Link } from 'react-router-dom'
export default function Footer() {
    return (
        <footer className = "footer">
            <div className="wrapper">
                <div className="footer-inner">
                    <div className="footer-item">
                        <form className="footer-form">
                            <input type="email" placeholder = "Your email..." />
                            <button className = "footer-btn">
                                Subscribe
                            </button>
                        </form>
                    </div>
                    <div className="footer-item">
                        <Link className="footer-list-item" to = {"/"}>Rules</Link>
                        <Link className="footer-list-item" to = {"/"}>FAQ</Link>
                        <Link className="footer-list-item" to = {"/"}>Report</Link>
                        <Link className="footer-list-item" to = {"/"}>Support</Link>
                    </div>
                </div>
            </div>
            <div className="footer-outer">
                    <Link to = "/" className= "footer-rights">
                        Travel Log ©
                    </Link>
                </div>
        </footer>
    )
}
