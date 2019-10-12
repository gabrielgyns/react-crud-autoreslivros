import React from 'react';
import LinkWrapper from './../../utils/LinkWrapper';

export default function Header () {
    return(
        <nav>
            <div className="nav-wrapper indigo">
                <LinkWrapper to='/' className="brand-logo left">CW</LinkWrapper>
                <ul className="right">
                    <li><LinkWrapper to='/autores'>Autores</LinkWrapper></li>
                    <li><LinkWrapper to='/livros'>Livros</LinkWrapper></li>
                    <li><LinkWrapper to='/sobre'>Sobre</LinkWrapper></li>
                </ul>
            </div>
        </nav>
    );
}