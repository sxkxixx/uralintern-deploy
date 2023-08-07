import React from 'react';
import classes from '../css/Footer.module.css'
function Footer(props) {
    return (
        <footer className={classes["main-footer"]}>
        <p className={classes["ural-intern"]}> © <a href='https://uralintern.ru/'> Уральский центр стажировок, 2022</a></p>
        <div className={classes["VK-link"]}>
            <p>По вопросам можно обращаться сюда:</p>
            <a href='https://vk.com/uralintern'><img src={require("../images/VK.svg").default} width="30" height="30" alt="Vk"/></a>
        </div>
    </footer>
    );
}

export default Footer;